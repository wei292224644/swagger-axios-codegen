import camelcase from 'camelcase'
import { IDefinitionClass, IDefinitionClasses, IDefinitionEnum, IDefinitionEnums, ISwaggerOptions } from '../baseInterfaces'
import { IPaths } from '../swaggerInterfaces'
import { getClassNameByPath, getMethodNameByPath, RemoveSpecialCharacters } from '../utils'
import { getContentType } from './getContentType'
import { getRequestBody } from './getRequestBody'
import { getRequestParameters } from './getRequestParameters'
import { getResponseType } from './getResponseType'
import { mapFormDataToV2 } from './mapFormDataToV2'

export interface IRequestClass {
  [key: string]: IRequestMethods[];
}

export interface IRequestMethods {
  name: string;
  operationId: string;
  requestSchema: any;
}

export function requestCodegen(paths: IPaths, isV3: boolean, options: ISwaggerOptions): { requestClass: IRequestClass, definitionModels: IDefinitionClasses, definitionEnums: IDefinitionEnums } {
  const requestClasses: IRequestClass = {}

  let definitionModels: IDefinitionClasses = {}
  let definitionEnums: IDefinitionEnums = {}

  if (!!paths)
    for (const [path, request] of Object.entries(paths)) {
      let methodName = getMethodNameByPath(path)
      for (const [method, reqProps] of Object.entries(request)) {
        methodName =
          options.methodNameMode === 'operationId'
            ? reqProps.operationId
            : options.methodNameMode === 'shortOperationId'
              ? trimSuffix(reqProps.operationId, reqProps.tags?.[0])
              : typeof options.methodNameMode === 'function'
                ? options.methodNameMode(reqProps)
                : methodName
        if (!methodName) {
          // console.warn('method Name is null：', path);
          continue
        }
        const contentType = getContentType(reqProps, isV3)
        let formData = ''
        let pathReplace = ''
        // 获取类名
        let className
        if (options.classNameMode === 'parentPath') {
          className = getClassNameByPath(path)
          // 空则归类默认类名
          if (className === '') {
            className = options.pathClassNameDefaultName
          } else {
            className = camelcase(className, { pascalCase: true })
          }
        } else if (typeof options.classNameMode === 'function') {
          className = options.classNameMode(path, method, reqProps)
        } else {
          if (!reqProps.tags) continue
          className = camelcase(RemoveSpecialCharacters(reqProps.tags[0]), { pascalCase: true })
        }

        if (className === '') continue
        // 如果是数字开头，则加上下划线
        if (!Number.isNaN(Number(className[0]))) className = '_' + className

        // 是否存在
        if (!requestClasses[className]) {
          requestClasses[className] = []
        }
        let parameters = ''
        let handleNullParameters = ''
        let parsedParameters: any = {
          requestParameters: ''
        }

        const multipartDataProperties = reqProps?.requestBody?.content['multipart/form-data']

        if (reqProps.parameters || multipartDataProperties) {
          // 获取到接口的参数
          let tempParameters = reqProps.parameters || []

          // 合并两个参数类型
          if (multipartDataProperties) {
            tempParameters = tempParameters.concat(mapFormDataToV2(multipartDataProperties.schema))
          }

          parsedParameters = getRequestParameters(tempParameters, options.useHeaderParameters)
          formData = parsedParameters.requestFormData
            ? 'data = new FormData();\n' + parsedParameters.requestFormData
            : ''
          pathReplace = parsedParameters.requestPathReplace
        }

        let imports = parsedParameters.imports || []

        let parsedRequestBody: any = {}
        if (reqProps.requestBody) {
          parsedRequestBody = getRequestBody(reqProps.requestBody, path)

          // 合并imports
          if (parsedRequestBody.imports?.length >= 0) {
            // console.log("requestBody ", parsedRequestBody);
            imports.push(...parsedRequestBody.imports)
          }
          for (const [path, model] of Object.entries(parsedRequestBody.models)) {
            definitionModels[path] = model as IDefinitionClass;
          }

          for (const [path, enumData] of Object.entries(parsedRequestBody.enums)) {
            definitionEnums[path] = enumData as IDefinitionEnum;
          }

          parsedParameters.requestParameters = parsedParameters.requestParameters
            ? parsedParameters.requestParameters + parsedRequestBody.bodyType
            : parsedRequestBody.bodyType
        }

        parameters =
          parsedParameters.requestParameters?.length > 0
            ? `params: {
              ${parsedParameters.requestParameters}
          } = {} as any,`
            : ''

        const { responseType, isRef: refResponseType } = getResponseType(reqProps, isV3)
        // 如果返回值也是引用类型，则加入到类的引用里面
        // console.log('refResponseType', responseType, refResponseType)

        if (refResponseType) {
          imports.push(responseType)
        }

        parsedParameters.imports = imports

        // TODO 待优化，目前简单处理同名方法
        let uniqueMethodName = camelcase(methodName)

        try {
          var uniqueMethodNameReg = new RegExp(`^${uniqueMethodName}[0-9]*$`)
          const methodCount = requestClasses[className].filter(
            item => uniqueMethodName === item.name || uniqueMethodNameReg.test(item.name)
          ).length
          // console.log(uniqueMethodName, methodCount)
          if (methodCount >= 1) {
            uniqueMethodName = uniqueMethodName + methodCount
            // console.log(uniqueMethodName)
          }
        } catch (error) {
          // 获取方法名字失败，跳过该请求
          console.log('error request, url: ', path)
          continue
        }


        requestClasses[className].push({
          name: uniqueMethodName,
          operationId: uniqueMethodName,
          requestSchema: {
            summary: reqProps.summary,

            path,
            pathReplace,
            parameters,
            parsedParameters,
            method,
            contentType,
            responseType,
            formData,
            requestBody: parsedRequestBody.bodyType
          }
        })
      }
    }
  return { requestClass: requestClasses, definitionEnums, definitionModels }
}

function trimSuffix(value: string, suffix: string) {
  return value?.endsWith(suffix) ? value.slice(0, -suffix.length) : value
}
