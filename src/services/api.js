import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

/* zidingyi */

export async function getOverviewData() {
  return request('/api/overview/data');
}

export async function getLatheDetail() {
  return request('/api/lathe/detail');

}

export async function queryUser(params) {
  return request(`/api/user1?${stringify(params)}`);
}

export async function removeUser(params) {
  return request('/api/user1', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addUser(params) {
  return request('/api/user1', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params = {}) {
  return request(`/api/user1?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryError(params) {
  return request(`/api/setting/error?${stringify(params)}`);
}

export async function removeError(params) {
  return request('/api/setting/error', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addError(params) {
  return request('/api/setting/error', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateError(params = {}) {
  return request(`/api/setting/error?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}
export async function queryFinishedTime(params) {
  return request(`/api/setting/finishedtime?${stringify(params)}`);
}

export async function removeFinishedTime(params) {
  return request('/api/setting/finishedtime', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addFinishedTime(params) {
  return request('/api/setting/finishedtime', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFinishedTime(params = {}) {
  return request(`/api/setting/finishedtime?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}
export async function queryOee(params) {
  return request(`/api/setting/oee?${stringify(params)}`);
}

export async function removeOee(params) {
  return request('/api/setting/oee', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addOee(params) {
  return request('/api/setting/oee', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateOee(params = {}) {
  return request(`/api/setting/oee?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryTransmission(params) {
  return request(`/api/setting/transmission?${stringify(params)}`);
}

export async function removeTransmission(params) {
  return request('/api/setting/transmission', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addTransmission(params) {
  return request('/api/setting/transmission', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateTransmission(params = {}) {
  return request(`/api/setting/transmission?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryMaintain(params) {
  return request(`/api/setting/maintain?${stringify(params)}`);
}

export async function removeMaintain(params) {
  return request('/api/setting/maintain', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addMaintain(params) {
  return request('/api/setting/maintain', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateMaintain(params = {}) {
  return request(`/api/setting/maintain?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}
export async function queryPlanning(params) {
  return request(`/api/setting/planning?${stringify(params)}`);
}

export async function removePlanning(params) {
  return request('/api/setting/planning', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addPlanning(params) {
  return request('/api/setting/planning', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updatePlanning(params = {}) {
  return request(`/api/setting/planning?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function queryConnect(params) {
  return request(`/api/setting/connect?${stringify(params)}`);
}

export async function removeConnect(params) {
  return request('/api/setting/connect', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addConnect(params) {
  return request('/api/setting/connect', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateConnect(params = {}) {
  return request(`/api/setting/connect?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}
export async function updateEquipmentConnect(params = {}) {
  return request(`/api/setting/connect?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'updateequipment',
    },
  });
}
export async function updatePlanningEquipment(params = {}) {
  return request(`/api/setting/planning?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'updateequipment',
    },
  });
}

export async function fakeAccountLoginout() {
  return request('/api/login/account/loginout');
}

export async function queryEquipmentbase(params) {
  return request(`/api/equipmentbase?${stringify(params)}`);
}

export async function queryEquipmentequip(params) {
  return request(`/api/equipmentequip?${stringify(params)}`);
}

export async function getAlart() {
  return request('/api/get/alart');
}

export async function queryProduction(params) {
  return request(`/api/settings/production?${stringify(params)}`);
}

export async function removeProduction(params) {
  return request('/api/settings/production', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addProduction(params) {
  return request('/api/settings/production', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateProduction(params = {}) {
  return request(`/api/settings/production?${stringify(params.query)}`, {
    method: 'POST',
    body: {
      ...params.body,
      method: 'update',
    },
  });
}
// 自定义接口
export async function OverviewScheduledata() {
  return request('/api/overview/schedule');
}

export async function ProductTable(params) {
  return request(`/api/overview/producttable?${stringify(params)}`);
}

export async function TransitionTable(params) {
  return request(`/api/overview/transitiontable?${stringify(params)}`);
}

export async function UnusualTable(params) {
  return request(`/api/overview/unusualtable?${stringify(params)}`);
}

export async function UnusualStatus() {
  return request('/api/overview/unusualstatus');
}
export async function OeeData() {
  return request('/api/overview/oeedata');
}

export async function QualifiedData() {
  return request('/api/overview/qualifieddata');
}

export async function EquipmentStatusData() {
  return request('/api/overview/equipmentstatusdata');
}

export async function GetProductionLayout() {
  return request('/api/overview/getproductionlayout');
}

export async function GetEquipmentSecondData(params) {
  return request(`/api/equipment/seconddata?${stringify(params)}`);
}

export async function GetEquipmentMiniteData(params) {
  return request(`/api/equipment/minitedata?${stringify(params)}`);
}

export async function GetEquipmentUnusualTableData(params) {
  return request(`/api/equipment/tabledata?${stringify(params)}`);
}



