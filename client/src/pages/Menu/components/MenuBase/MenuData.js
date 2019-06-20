import networkStatus from './images/icon-networkstatus.png';
import clusterStatus from './images/icon-clusterstatus.png';
import failureStatus from './images/icon-failurestatus.png';
import dailyInspection from './images/icon-dailyInspection.png';
import keyMonitor from './images/icon-keymonitor.png';
import businessAbility from './images/icon-businessability.png';
import smartTransport from './images/icon-smarttransport.png';
import virtualRoom from './images/icon-virtualroom.png';
import operationaldescription from './images/icon-operationalinfo.png';
import resourceManage from './images/icon-resourcemanage.png';

const MenuConfig = [
  {
    name: '网络状态',
    description: '网络状态的描述是网络状态',
    path: '/NetworkCondition',
    imageUrl: networkStatus,
  },
  {
    name: '集群状态',
    description: '集群状态的描述是集群状态',
    path: '/ColonyStatus',
    imageUrl: clusterStatus,
  },
  {
    name: '故障状态',
    description: '故障状态的描述是故障状态',
    path: '/FailureStatus',
    imageUrl: failureStatus,
  },
  {
    name: '日常巡检',
    description: '日常巡检的描述是日常巡检',
    path: '/DailyInspection/Capacity',
    imageUrl: dailyInspection,
  },
  {
    name: '重点监控',
    description: '重点监控的描述是重点监控',
    path: '/KeyMonitor',
    imageUrl: keyMonitor,
  },
  {
    name: '业务能力',
    description: '业务能力的描述是业务能力',
    path: '/BusinessAbility',
    imageUrl: businessAbility,
  },
  {
    name: '智能运维',
    description: '智能运维的描述是智能运维',
    path: '/SmartTransport',
    imageUrl: smartTransport,
  },
  {
    name: '虚拟机房',
    description: '虚拟机房的描述是虚拟机房',
    path: '/VirtualRoom',
    imageUrl: virtualRoom,
  },
  {
    name: '运维信息',
    description: '运维信息的描述是运维信息',
    path: '/Operationaldescription',
    imageUrl: operationaldescription,
  },
  {
    name: '资源管理',
    description: '资源管理的描述是资源管理',
    path: '/ResourceManage',
    imageUrl: resourceManage,
  },
];

export default MenuConfig;
