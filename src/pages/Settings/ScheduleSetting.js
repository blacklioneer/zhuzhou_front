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
  Icon,
  Button,
  Dropdown,
  Menu,
  Divider,
  InputNumber,
  Slider,
  DatePicker,
  Modal,
  message,
  Badge,
  Steps,
  Radio,
  Switch,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './User.less';


const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'success',];
const status = ['未加工', '正在加工', ];
// const eid= ['','KD-33','KD-34','KD-35','KD-36','KD-37','KD-38','KD-39','KD-40','BP-11','BP-12','BP-13','BP-14','BP-15','BP-16','BP-17','BP-18'];
const eid= ['','KD-33','KD-34','KD-35','BP-11','BP-12','BP-13'];
const run = [false,true];
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
      title="新建订单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="订单号">
        {form.getFieldDecorator('ordernum')(<Input placeholder="请输入订单号" />)}
      </FormItem>
    </Modal>
  );
});


@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        id: props.values.id,
        eid: props.values.eid,
        suppliesnum: props.values.suppliesnum,
        order: props.values.order,
        ordernum: props.values.ordernum,
        date:props.values.date,
        unqualified:props.values.unqualified,
        technologytime:props.values.technologytime,
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 3) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="eid" {...this.formLayout} label="加工设备">
          {form.getFieldDecorator('eid', {
            initialValue: eid[formVals.eid],
          })(
            <Select style={{ width: '100%' }}>
              <Option value="1">KD-33</Option>
              <Option value="2">KD-34</Option>
              <Option value="3">KD-35</Option>
              {/* <Option value="4">KD-36</Option>
            <Option value="5">KD-37</Option>
            <Option value="6">KD-38</Option>
            <Option value="7">KD-39</Option>
            <Option value="8">KD-40</Option> */}
              <Option value="4">BP-11</Option>
              <Option value="5">BP-12</Option>
              <Option value="6">BP-13</Option>
              {/*            <Option value="12">BP-14</Option>
            <Option value="13">BP-15</Option>
            <Option value="14">BP-16</Option>
            <Option value="15">BP-17</Option>
            <Option value="16">BP-18</Option>  */}
            </Select>
          )}
        </FormItem>,
      ];
    }
    if (currentStep === 2) {
      return [
        <FormItem key="time" {...this.formLayout} label="计划加工时间">
          {form.getFieldDecorator('date')(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD"
              placeholder="选择加工时间(不输入保留原时间)"
            />
          )}
        </FormItem>,
      ];
    }
    if (currentStep === 3) {
      return [
        <FormItem key="technologytime_m" {...this.formLayout} label="分钟">
          {form.getFieldDecorator('technologytime_m')(
            <Row>
{/*              <Col span={12}>
                <Slider
                  min={0}
                  max={60}
                />
              </Col> */}
              <Col span={12}>
                <InputNumber
                  min={0}
                  style={{ marginLeft: 16 }}
                />
              </Col>
            </Row>
          )}
        </FormItem>,
        <FormItem key="technologytime_s" {...this.formLayout} label="秒">
          {form.getFieldDecorator('technologytime_s')(
            <Row>
              {/* <Col span={12}>
                <Slider
                  min={0}
                  max={60}
                />
              </Col> */}
              <Col span={12}>
                <InputNumber
                  min={0}
                  max={60}
                  style={{ marginLeft: 16 }}
                />
              </Col>
            </Row>
          )}
        </FormItem>,
      ];
    }
    return [
      <FormItem key="ordernum" {...this.formLayout} label="订单号">
        {form.getFieldDecorator('ordernum', {
          initialValue: formVals.ordernum,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="supplies" {...this.formLayout} label="物料号">
        {form.getFieldDecorator('suppliesnum',{
          initialValue: formVals.suppliesnum,
          // initialValue: formVals.password, /* 密码无法解密只能验证，否则安全性无法保证,加密算法不支持解密 */
        })
        (<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="order" {...this.formLayout} label="订单量">
        {form.getFieldDecorator('order', {
          initialValue: formVals.order,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="finished" {...this.formLayout} label="完成量修正">
        {form.getFieldDecorator('finished')
        (<Input placeholder="若完成量有误请输入" />)}
      </FormItem>,
      <FormItem key="unqualified" {...this.formLayout} label="不合格量">
        {form.getFieldDecorator('unqualified', {
          initialValue: formVals.unqualified,
        })(<Input placeholder="请输入" />)}
      </FormItem>,
    ];
  };

  renderFooter = currentStep => {
    const { handleUpdateModalVisible, values } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      ];
    }
    if (currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      ];
    }
    if (currentStep === 3) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="输入订单信息" />
          <Step title="配置加工设备" />
          <Step title="设定加工时间" />
          <Step title="设定工艺时间" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}


@Form.create()
class UpdateEquipmentForm extends PureComponent {
  static defaultProps = {
    handleUpdateEquipment: () => {},
    handleUpdateEquipmentVisible: () => {}, /* 加工状态设置表是否可见 */
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
        <FormItem key="status" {...this.formLayout} label="加工状态">
          {form.getFieldDecorator('status',
            {initialValue:run[formVals.status], valuePropName: 'checked' })(<Switch />
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
        title="排产设置"
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
@connect(({ schedulesetting, loading }) => ({
  schedulesetting,
  loading: loading.models.schedulesetting,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    equipmentmodalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    equipmentFormValues: {},
  };

  columns = [
    {
      title: '订单号',
      dataIndex: 'ordernum',
      sorter: true,
      // render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '物料号',
      dataIndex: 'suppliesnum',
    },
    {
      title: '订单量',
      dataIndex: 'order',
    },
    {
      title: '完成量',
      dataIndex: 'finished',
    },
    {
      title: '不合格量',
      dataIndex: 'unqualified',
    },
    {
      title: '工艺时间',
      dataIndex: 'technologytime',
      render: val => <span>{parseInt(val/60000,10)}m{Math.round(val%60000)/1000}s</span>,
    },
    {
      title: '排产日期',
      dataIndex: 'date',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
    },
    {
      title: '加工设备',
      dataIndex: 'eid',
      sorter:true,
      render: val => <span>{eid[val]}</span>,
    },
    {
      title: '排产',
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
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>属性设置</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdateEquipmentVisible(true, record)}>排产</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'schedulesetting/fetch',
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
      type: 'schedulesetting/fetch',
      payload: params,
    });
  };


  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'schedulesetting/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
      dispatch({
        type: 'schedulesetting/remove',
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
        type: 'schedulesetting/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
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
      type: 'schedulesetting/add',
      payload: {
        ordernum: fields.ordernum,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdateEquipment = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'schedulesetting/updateequipment',
      payload: {
        query: formValues,
        body: {
          id: fields.id,
          eid: fields.eid,
          status: fields.status,
        },
      },
    });

    message.success('配置成功');
    this.handleUpdateEquipmentVisible();
  };


  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'schedulesetting/update',
      payload: {
        query: formValues,
        body: {
          id: fields.id,
          eid: fields.eid,
          suppliesnum: fields.suppliesnum,
          order: fields.order,
          ordernum: fields.ordernum,
          date:fields.date,
          unqualified:fields.unqualified,
          finished:fields.finished,
          technologytime_m:fields.technologytime_m,
          technologytime_s:fields.technologytime_s,
        },
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('ordernum')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="加工状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">未加工</Option>
                  <Option value="1">正在加工</Option>
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
      schedulesetting: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues,equipmentmodalVisible,equipmentFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };
    const updateEquipmentMethods = {
      handleUpdateEquipmentVisible: this.handleUpdateEquipmentVisible,
      handleUpdateEquipment: this.handleUpdateEquipment,
    };
    return (
      <PageHeaderWrapper title="订单管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button icon="delete" type="primary" onClick={() => this.handleMenuClick()}>
                    删除
                  </Button>
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
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
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
