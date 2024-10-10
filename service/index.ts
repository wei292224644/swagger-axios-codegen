/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /**
   * show loading status
   */
  loading?: boolean;
  /**
   * display error message
   */
  showError?: boolean;
  /**
   * indicates whether Authorization credentials are required for the request
   * @default true
   */
  withAuthorization?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class UserService {
  /**
   * 添加新用户
   */
  static add(
    params: {
      /** requestBody */
      body?: UserAdd;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<user> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/add';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class AuthService {
  /**
   * 发送短信验证码
   */
  static sendSms(
    params: {
      /** 欲进行登录活动的手机号 */
      mob: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/sendSMS';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { mob: params['mob'] };

      axios(configs, resolve, reject);
    });
  }
  /**
   * 短信验证码登录
   */
  static viaSms(
    params: {
      /** requestBody */
      body?: AuthViaSMS;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<jwt> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/viaSMS';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 刷新jwt
   */
  static refreshToken(
    params: {
      /** requestBody */
      body?: AuthRefreshToken;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<jwt> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/refreshToken';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 获取oss上传鉴权token
   */
  static getOssSts(options: IRequestOptions = {}): Promise<sts> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/auth/getOssSts';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class ShipService {
  /**
   * 列出待审核/审核中新建船只申请
   */
  static listAwaitingApprovals(options: IRequestOptions = {}): Promise<shipGist[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/ship/listAwaitingApprovals';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   * 提交创建新申请
   */
  static submitNewShipForApproval(
    params: {
      /** requestBody */
      body?: ShipSubmitNewShipForApproval;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/ship/submitNewShipForApproval';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 搜索船只
   */
  static search(
    params: {
      /** 船只中文名称 */
      name: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<shipDetail[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/ship/search';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { name: params['name'] };

      axios(configs, resolve, reject);
    });
  }
  /**
   * 审核并入库船只
   */
  static approve(options: IRequestOptions = {}): Promise<any | null> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/ship/approve';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class OrderService {
  /**
   * 创建新订单
   */
  static create(
    params: {
      /** requestBody */
      body?: OrderCreate;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/order/create';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 列出我创建的订单
   */
  static list(options: IRequestOptions = {}): Promise<orderGist[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/order/list';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   * 订单详情
   */
  static detail(
    params: {
      /** 订单id */
      orderId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<orderDetail> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/order/detail';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { orderId: params['orderId'] };

      axios(configs, resolve, reject);
    });
  }
}

export class SmTaskService {
  /**
   * 拉取维保任务的检查/履约项
   */
  static fetchEntries(
    params: {
      /** 维保任务的id */
      taskId: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<smTaskEntries> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/smTask/fetchEntries';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { taskId: params['taskId'] };

      axios(configs, resolve, reject);
    });
  }
}

export interface jwt {
  /**  */
  accessToken: string;

  /**  */
  refreshToken: string;
}

export interface sts {
  /**  */
  accessKey: string;

  /**  */
  secret: string;

  /**  */
  securityToken: string;

  /**  */
  exp: string;
}

export interface user {
  /**  */
  id: number;

  /**  */
  name: string;

  /**  */
  gender: EnumuserGender;

  /**  */
  mobNum: string;

  /**  */
  createdAt: string;

  /** PlatformAdmin=平台管理员, SalesRep=销售, SMOperator=维保作业员, SMCoordinator=维保调度员, ShipyardLiason=船厂管理员 */
  roles: string[];
}

export interface smTaskEntries {
  /**  */
  entries: smTaskEntry[];
}

export interface newUserInput {
  /**  */
  name: string;

  /**  */
  gender?: EnumnewUserInputGender;

  /**  */
  mobNum: string;

  /** PlatformAdmin=平台管理员, SalesRep=销售, SMOperator=维保作业员, SMCoordinator=维保调度员, ShipyardLiason=船厂管理员 */
  roles?: EnumnewUserInputRoles[];
}

export interface newShipInput {
  /** 船只的名称 */
  nameCN: string;

  /** 上级主管单位的唯一注册编码 */
  regSerial?: string;

  /** 重量,单位:吨 */
  tons?: number;

  /** 船舶总长, 单位:米 */
  length?: number;

  /** 船舶型宽, 单位:米 */
  width?: number;

  /** 船舶型深, 单位:米 */
  depth?: number;
}

export interface newOrderInput {
  /** 订单所属的船厂id */
  shipyardId: number;

  /** 订单所属的船台id */
  dockId: number;

  /** 订单所属的服务商的id */
  ispId: number;

  /** 订单生成当天的现场实拍照片 */
  fieldImgs: string[];

  /** 订单关联的船只id */
  shipId: number;
}

export interface shipDetail {
  /**  */
  id?: number;

  /**  */
  regSerial?: any | null;

  /**  */
  type?: EnumshipDetailType;

  /**  */
  nameCn: string;

  /**  */
  nameEn?: any | null;

  /**  */
  length?: number;

  /**  */
  width?: number;

  /**  */
  depth?: number;

  /**  */
  shipyard?: any | null;

  /**  */
  builtDate?: string;

  /**  */
  modDate?: string;

  /**  */
  approved?: boolean;

  /**  */
  createdAt?: string;

  /**  */
  approvedAt?: string;

  /**  */
  filedImgs?: any | null;
}

export interface device {
  /**  */
  id?: number;

  /**  */
  type: EnumdeviceType;

  /**  */
  supplier?: string;

  /**  */
  releasedDate?: string;

  /**  */
  model?: any | null;

  /**  */
  batch?: any | null;

  /**  */
  shipyardId: number;
}

export interface smTask {
  /**  */
  id?: number;

  /**  */
  type: EnumsmTaskType;

  /**  */
  title?: string;
  null;
}

export interface smTaskEntry {
  /**  */
  id?: number;

  /**  */
  title: string;

  /**  */
  description?: any | null;

  /**  */
  reqImgProof?: boolean;

  /**  */
  maxProofImgsCount?: number;

  /**  */
  proofImgs?: any | null;

  /**  */
  reqVidProof?: boolean;

  /**  */
  maxProofVidsCount?: number;

  /**  */
  proofVids?: any | null;

  /**  */
  taskId: number;
}

export interface shipGist {
  /**  */
  id?: number;

  /**  */
  regSerial?: any | null;

  /**  */
  type?: EnumshipGistType;

  /**  */
  nameCn: string;

  /**  */
  length?: number;

  /**  */
  width?: number;

  /**  */
  depth?: number;

  /**  */
  approved?: boolean;

  /**  */
  approvedAt?: string;

  /**  */
  filedImgs?: any | null;
}

export interface orderGist {
  /** 订单id */
  id: string;

  /**  */
  status: orderStatus;

  /**  */
  shipName: string;

  /**  */
  shipRegSerial: string;

  /**  */
  shipyardName: string;

  /**  */
  dockName: string;
}

export interface orderDetail {
  /**  */
  id: string;

  /**  */
  ship: shipDetail;

  /** 费用 */
  cost: number;

  /**  */
  status: orderStatus;

  /** 订单创建时间戳 */
  createdAt: number;

  /** 订单关联设备解锁时间 */
  unlockDeviceAt: number;

  /** 订单关联设备上锁时间 */
  lockDeviceAt: number;

  /** 销售代表姓名 */
  salesRep: string;

  /** 匹配到当前订单的设备 */
  devices: device[];

  /** 业前检查任务 */
  preFfCheckTask: object;
}

export interface UserAdd {
  /**  */
  name: string;

  /**  */
  gender?: EnumUserAddGender;

  /**  */
  mobNum: string;

  /** PlatformAdmin=平台管理员, SalesRep=销售, SMOperator=维保作业员, SMCoordinator=维保调度员, ShipyardLiason=船厂管理员 */
  roles?: EnumUserAddRoles[];
}

export interface AuthViaSMS {
  /** 欲进行登录\/注册活动的手机号 */
  mob: string;

  /** 收到的短信验证码 */
  smsCode: number;
}

export interface AuthRefreshToken {
  /**  */
  accessToken: string;

  /**  */
  refreshToken: string;
}

export interface ShipSubmitNewShipForApproval {
  /** 船只的名称 */
  nameCN: string;

  /** 上级主管单位的唯一注册编码 */
  regSerial?: string;

  /** 重量,单位:吨 */
  tons?: number;

  /** 船舶总长, 单位:米 */
  length?: number;

  /** 船舶型宽, 单位:米 */
  width?: number;

  /** 船舶型深, 单位:米 */
  depth?: number;
}

export interface OrderCreate {
  /** 订单所属的船厂id */
  shipyardId: number;

  /** 订单所属的船台id */
  dockId: number;

  /** 订单所属的服务商的id */
  ispId: number;

  /** 订单生成当天的现场实拍照片 */
  fieldImgs: string[];

  /** 订单关联的船只id */
  shipId: number;
}
export enum EnumuserGender {
  'unkown' = 'unkown',
  'male' = 'male',
  'femal' = 'femal'
}
export enum EnumnewUserInputGender {
  'unkown' = 'unkown',
  'male' = 'male',
  'femal' = 'femal'
}
export enum EnumnewUserInputRoles {
  'PlatformAdmin' = 'PlatformAdmin',
  'SalesRep' = 'SalesRep',
  'SMOperator' = 'SMOperator',
  'SMCoordinator' = 'SMCoordinator',
  'ShipyardLiason' = 'ShipyardLiason'
}
export enum EnumshipDetailType {
  '干货船' = '干货船',
  '散装化学品船/油船' = '散装化学品船/油船',
  '其他' = '其他'
}
export enum orderStatus {
  'Executing' = 'Executing',
  'Abnormal' = 'Abnormal',
  'Awaiting' = 'Awaiting',
  'Fulfilled' = 'Fulfilled'
}
export enum EnumdeviceType {
  '超高压泵组' = '超高压泵组',
  '手持枪' = '手持枪',
  '直线式清洗盘' = '直线式清洗盘',
  '轮式船底小车' = '轮式船底小车',
  '真空回收装置' = '真空回收装置',
  '超高压水管' = '超高压水管',
  '污水净化设备' = '污水净化设备'
}
export enum EnumsmTaskType {
  '业前检查' = '业前检查',
  '日常保养' = '日常保养',
  '日常巡检' = '日常巡检',
  '定期保养' = '定期保养',
  '设备维修' = '设备维修',
  '结业锁机' = '结业锁机'
}
export enum EnumshipGistType {
  '干货船' = '干货船',
  '散装化学品船/油船' = '散装化学品船/油船',
  '其他' = '其他'
}
export enum EnumUserAddGender {
  'unkown' = 'unkown',
  'male' = 'male',
  'femal' = 'femal'
}
export enum EnumUserAddRoles {
  'PlatformAdmin' = 'PlatformAdmin',
  'SalesRep' = 'SalesRep',
  'SMOperator' = 'SMOperator',
  'SMCoordinator' = 'SMCoordinator',
  'ShipyardLiason' = 'ShipyardLiason'
}
