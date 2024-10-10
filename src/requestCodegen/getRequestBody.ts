import pascalcase from "pascalcase";
import { componentsCodegen } from "../componentsCodegen";
import { createDefinitionClass } from "../componentsCodegen/createDefinitionClass";
import { IComponents, IRequestBody } from "../swaggerInterfaces";
import { refClassName } from "../utils";
import { IDefinitionClasses, IDefinitionEnums } from "../baseInterfaces";

const pathClassName = (path: string) => {
  // let className = path.replace(/\//g, '');
  let strs = path.split("/");
  strs = strs.map(str => pascalcase(str));
  const className = strs.join("")
  return className;
}

export function getRequestBody(requestBody: IRequestBody, path: string) {
  let definitionModels: IDefinitionClasses = {}
  let definitionEnums: IDefinitionEnums = {}
  // 如果是空则直接反回
  if (!requestBody.content) return

  let imports: string[] = []
  let bodyType = ''

  const allContent = Object.keys(requestBody.content)
  // 默认去application/json的定义，如果取不到则直接取第一个
  let reqBody = requestBody.content["application/json"]
  // console.log("reqBody 1:", !reqBody);
  if (!reqBody) {
    reqBody = requestBody.content[allContent[0]]
  }
  // console.log("reqBody 2:", reqBody);

  if (reqBody == null) {
    return { imports, bodyType }
  }

  if (reqBody.schema) {
    if (reqBody.schema.items) {
      bodyType = refClassName(reqBody.schema.items.$ref)
      if (reqBody.schema.type && reqBody.schema.type === 'array') {
        bodyType += '[]'
      }
    } else if (reqBody.schema.$ref) {
      bodyType = refClassName(reqBody.schema.$ref)
      // console.log('propType', refClassName(p.schema.$ref))
    } else if (reqBody.schema.properties && reqBody.schema.type) {
      const v = reqBody.schema;

      const className = pathClassName(path)

      //@ts-ignore
      const { enums, model } = createDefinitionClass(className, v.properties, v.additionalProperties, v.required);

      enums.forEach(item => {
        // definitionModels[item.name] = {
        //   value: item.text
        // }
        definitionEnums[`#/components/schemas/${item.name}`] = {
          name: item.name,
          content: item.text
        }
      })

      definitionModels[`#/components/schemas/${className}`] = {
        value: model,
        name: className
      }
      bodyType = className;
    }
    if (bodyType) {
      imports.push(bodyType)
      bodyType = `
      /** requestBody */
      body?:${bodyType},`
    }

  }
  return { imports, bodyType, models: definitionModels, enums: definitionEnums }
}