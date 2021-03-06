import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Button,
  Checkbox,
  Modal,
  message,
  Badge,
 Switch,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Authorized from '@/utils/Authorized'

import styles from './User.less';


const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['warning','success'];
const status = ['已结束','排班中'];
// const eid= ['','KD-33','KD-34','KD-35','KD-36','KD-37','KD-38','KD-39','KD-40','BP-11','BP-12','BP-13','BP-14','BP-15','BP-16','BP-17','BP-18'];
const eid= ['','KD-36','KD-43','KD-44','KD-47','KD-48','KD-39'];
const options=[
  { label: 'KD-36', value: '1' },
  { label: 'KD-43', value: '2' },
  { label: 'KD-44', value: '3' },
  { label: 'KD-47', value: '4' },
  { label: 'KD-48', value: '5' },
  { label: 'KD-39', value: '6' },
];

const run= [false,true];


const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="排班信息录入"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem key="eid" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择排班设备">
        {form.getFieldDecorator('eid')(
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              {
                options ? options.map(item=>{
                  return(
                    <Col span={8}>
                      <Checkbox value={item.value}>{item.label}</Checkbox>
                    </Col>
                  )
                }) : []
              }
            </Row>
          </Checkbox.Group>,
        )}
      </FormItem>
      <FormItem key="manager" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="负责人">
        {form.getFieldDecorator('manager')(
          <Input placeholder="请输入姓名" />
        )}
      </FormItem>
    </Modal>
  );
});

const FinishForm = Form.create()(props => {

  const { modalFinishVisible, form, handleFinish, handleFinishModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleFinish(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="班次结束"
      visible={modalFinishVisible}
      onOk={okHandle}
      onCancel={() => handleFinishModalVisible()}
    >
      <FormItem key="eid" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择设备">
        {form.getFieldDecorator('eid')(
          <Checkbox.Group style={{ width: '100%' }} >
            <Row>
              <Col span={8}>
                <Checkbox value="1">KD-36</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="2">KD-43</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="3">KD-44</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="4">KD-47</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="5">KD-48</Checkbox>
              </Col>
              <Col span={8}>
                <Checkbox value="6">KD-37</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>,
        )}
      </FormItem>
    </Modal>
  );
});

@Form.create()
class UpdateEquipmentForm extends PureComponent {
  static defaultProps = {
    handleUpdateEquipment: () => {},
    handleUpdateEquipmentVisible: () => {}, /* 异常状态设置表是否可见 */
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        eid: props.values.eid,
        id: props.values.id,
        status: props.values.status,
      },
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = () => {
    const { form, handleUpdateEquipment } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          handleUpdateEquipment(formVals);
        }
      );
    });
  };

  renderContent = (formVals) => {
    const { form } = this.props;

    return [
      <FormItem key="status" {...this.formLayout} label="班次状态">
        {form.getFieldDecorator('status',
          { initialValue:run[formVals.status],valuePropName: 'checked' })(
            <Switch />
        )}
      </FormItem>,
    ];
  };

  renderFooter = () => {
    const { handleUpdateEquipmentVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateEquipmentVisible(false, values)}>
        取消
      </Button>,
      <Button key="submit" type="primary" onClick={() => this.handleNext()}>
        完成
      </Button>,
    ];
  };

  render() {
    const { equipmentmodalVisible, handleUpdateEquipmentVisible, values } = this.props;
    const { formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="结束当前班次"
        visible={equipmentmodalVisible}
        footer={this.renderFooter()}
        onCancel={() => handleUpdateEquipmentVisible(false, values)}
        afterClose={() => handleUpdateEquipmentVisible()}
      >
        {this.renderContent(formVals)}
      </Modal>
    );
  }
}
/* eslint react/no-multi-comp:0 */
@connect(({ finishedtimesetting, loading }) => ({
  finishedtimesetting,
  loading: loading.models.finishedtimesetting,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalFinishVisible: false,
    equipmentmodalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    equipmentFormValues: {},
  };

  columns = [
    {
      title: '设备名',
      dataIndex: 'eid',
      sorter:true,
      render: val => <span>{eid[val]}</span>,
    },
    {
      title: '负责人',
      dataIndex: 'manager',
    },
    {
      title: 'OEE',
      dataIndex: 'oee',
    },
    {
      title: '完成量',
      dataIndex: 'finishednum',
      sorter:true,
    },
    {
      title: '班次状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'starttime',
      sorter:true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '更换订单时间',
      dataIndex: 'changetime',
      sorter:true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '结束时间',
      dataIndex: 'finishedtime',
      sorter:true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    // {
    //   title: '累计登录次数',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   render: val => `${val}`,
    //   // mark to display a total number
    //   needTotal: true,
    // },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateEquipmentVisible(true, record)}>结束</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'finishedtimesetting/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'finishedtimesetting/fetch',
      payload: params,
    });
  };

  previewItem = id => {
    router.push(`/profile/basic/${id}`);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'finishedtimesetting/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick =() => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
      dispatch({
        type: 'finishedtimesetting/remove',
        payload: {
          id: selectedRows.map(row => row.id),
        },
        callback: () => {
          this.setState({
            selectedRows: [],
          });
        },
      });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'finishedtimesetting/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleFinishModalVisible = flag => {
    this.setState({
      modalFinishVisible: !!flag,
    });
  };

  handleUpdateEquipment = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'finishedtimesetting/update',
      payload: {
        query: formValues,
        body: {
          id: fields.id,
          eid: fields.eid,
          status: fields.status,
          // finishednum: fields.finishednum,
        },
      },
      callback: (response) => {
        if (response.error==='NotFoundOrder') {
          message.error(`失败，订单${response.pid}没有输入标准加工时间`)
        }
        else if (response.error==='NotExistOrder') {
          message.error(`失败，订单${response.pid}不存在`)
        }
        else {
          message.success('成功')
        }
      }
    });
    this.handleUpdateEquipmentVisible();
  };

  handleUpdateEquipmentVisible = (flag, record) => {
    this.setState({
      equipmentmodalVisible: !!flag,
      equipmentFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'finishedtimesetting/add',
      payload: {
        eid: fields.eid,
        manager: fields.manager,
      },
      callback: (response) => {
        if (response.error==='NOTFUND') {
          message.error('添加失败，没有加工中订单！请先选择加工订单')
        }
        else if (response.error==='NotFoundOrder') {
          message.error(`添加失败，订单${response.pid}不存在标准加工时间、请添加该订单标准加工时间`)
        }
        else {
          message.success('添加成功')
        }
      }
    });
    this.handleModalVisible();
  };

  handleFinish = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'finishedtimesetting/finish',
      payload: {
        eid: fields.eid,
      },
      callback: (response) => {
        if (response.error==='NotFoundEid') {
          message.error(`结束失败，设备${eid[response.eid]}没有进行中的班次`)
        }
        else if (response.error==='NotFoundOrder') {
          message.error(`结束失败，订单${response.pid}没有输入标准加工时间`)
        }
        else if (response.error==='NotExistOrder') {
          message.error(`结束失败，订单${response.pid}不存在`)
        }
        else {
          message.success('成功结束')
        }
      }
    });
    this.handleFinishModalVisible();
  };


  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="负责人">
              {getFieldDecorator('manager')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="处理状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">排班中</Option>
                  <Option value="0">已结束</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              {/*  <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a> */}
            </span>
          </Col>
        </Row>
      </Form>
    );
  }


  renderForm() {
    const { expandForm } = this.state;
    // return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    return expandForm ? this.renderSimpleForm(): this.renderSimpleForm();
  }

  render() {
    const {
      finishedtimesetting: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible,modalFinishVisible, equipmentmodalVisible,equipmentFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const parentFinishMethods = {
      handleFinish: this.handleFinish,
      handleFinishModalVisible: this.handleFinishModalVisible,
    };
    const updateEquipmentMethods = {
      handleUpdateEquipmentVisible: this.handleUpdateEquipmentVisible,
      handleUpdateEquipment: this.handleUpdateEquipment,
    };
    return (
      <PageHeaderWrapper title="班次管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              <Button icon="plus" type="primary" onClick={() => this.handleFinishModalVisible(true)}>
                结束
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Authorized authority={['admin']}>
                    <Button icon="delete" type="primary" onClick={() => this.handleMenuClick()}>
                      删除
                    </Button>
                  </Authorized>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <FinishForm {...parentFinishMethods} modalFinishVisible={modalFinishVisible} />
        {equipmentFormValues && Object.keys(equipmentFormValues).length ? (
          <UpdateEquipmentForm
            {...updateEquipmentMethods}
            equipmentmodalVisible={equipmentmodalVisible}
            values={equipmentFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
