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
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Steps,
  Radio, Switch, Divider,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


import styles from './User.less';
import ShowTable from '@/components/ShowTable';


const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['error', 'success','warning'];
const status = ['异常未解决', '已解决','预警未解决' ];
const type1 = ['机床报警','系统预警','录入故障'];
const eid= ['','KD-36','KD-43','KD-44','KD-47','KD-48','KD-39'];
const run= [false,true,false];
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
      title="异常录入"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem key="eid" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择异常设备">
        {form.getFieldDecorator('eid')(
          <Select style={{ width: '100%' }}>
            <Option value="1">KD-36</Option>
            <Option value="2">KD-43</Option>
            <Option value="3">KD-44</Option>
            <Option value="4">KD-47</Option>
            <Option value="5">KD-48</Option>
            <Option value="6">KD-39</Option>
          </Select>
        )}
      </FormItem>
      <FormItem key="errorid" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="异常编号">
        {form.getFieldDecorator('errorid')(
          <Input placeholder="请输入异常编号" />
        )}
      </FormItem>
      <FormItem key="error" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="异常时间">
        {form.getFieldDecorator('error')(
          <DatePicker
            style={{ width: '100%' }}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择异常时间(不输入录入当前时间)"
          />
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
      <FormItem key="status" {...this.formLayout} label="异常处理状态">
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
        title="异常处理状态设置"
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
@connect(({ errorsetting,editerrors, loading }) => ({
  errorsetting,
  editerrors,
  loading2: loading.models.errorsetting,
  loading1: loading.models.editerrors,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    equipmentmodalVisible: false,
    expandForm: false,
    selectedRows: [],
    selectedRows1: [],
    formValues: {},
    equipmentFormValues: {},
  };

  columns1 = [
    {
      title: '故障编号',
      dataIndex: 'id',
      width:90,
      fixed: 'left',
    },
    {
      title: '故障种类',
      dataIndex: 'type',
      width:90,
    },
    {
      title: '故障描述',
      dataIndex: 'desc',
      width:400,
    },
    {
      title: '故障原因',
      dataIndex: 'reason',
      width:400,
    },
    {
      title: '解决策略',
      dataIndex: 'solution',
      width:600,
    },
    {
      title: '录入时间',
      dataIndex: 'date',
      width:150,
    },
    ];

  columns2 = [
    {
      title: '设备名',
      dataIndex: 'eid',
      width:90,
      fixed:'left',
      sorter:true,
      render: val => <span>{eid[val]}</span>,
    },
    {
      title: '报警号',
      dataIndex: 'errorid',
      width:90,
      fixed: 'left',
    },
    {
      title: '异常描述',
      dataIndex: 'desc',
      width:500,
    },
    {
      title: '异常种类',
      dataIndex: 'type',
      width:120,
      filters: [
        {
          text: type1[0],
          value: 0,
        },
        {
          text: type1[1],
          value: 1,
        },
        {
          text: type1[2],
          value: 2,
        },
      ],
      render(val) {
        return <span>{type1[val]} </span>;
      },
    },
    {
      title: '处理措施',
      dataIndex: 'solution',
      width:500,
    },
    {
      title: '异常时间',
      dataIndex: 'error',
      width:150,
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
      title: '解决状态',
      dataIndex: 'status',
      width:150,
      fixed:'right',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
        {
          text: status[2],
          value: 2,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '操作',
      width:90,
      fixed:'right',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateEquipmentVisible(true, record)}>处理</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'errorsetting/fetch',
    });
    dispatch({
      type: 'editerrors/fetch',
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
      type: 'errorsetting/fetch',
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
      type: 'errorsetting/fetch',
      payload: {},
    });
  };
  handleFormReset1 = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'editerrors/fetch',
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
        type: 'errorsetting/remove',
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

  handleSelectRows1 = rows => {
    this.setState({
      selectedRows1: rows,
    });
  };

  handleSearch1 = e => {
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
        type: 'editerrors/fetch',
        payload: values,
      });
    });
  };

  handleSearch2 = e => {
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
        type: 'errorsetting/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateEquipment = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'errorsetting/update',
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

  handleUpdateEquipmentVisible = (flag, record) => {
    this.setState({
      equipmentmodalVisible: !!flag,
      equipmentFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'errorsetting/add',
      payload: {
        eid: fields.eid,
        errorid: fields.errorid,
        error: fields.error,
      },
      callback: (response) => {
        if (response.error==='NotFoundERRORID') {
          message.error('添加失败，故障代码不存在！！！！')
        } else {
          message.success('添加成功')
        }
      }
    });
    this.handleModalVisible();
  };


  renderSimpleForm1() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch1} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="故障代码">
              {getFieldDecorator('id')(<Input placeholder="请输入(不知道可不填)" />)}
            </FormItem>
            <FormItem label="故障类型">
              {getFieldDecorator('typesearch')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="机械故障">机械故障</Option>
                  <Option value="电气故障">电气故障</Option>
                  <Option value="其他">其他</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="故障信息描述关键词1">
              {getFieldDecorator('desc1')(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="故障信息描述关键词2">
              {getFieldDecorator('desc2')(<Input placeholder="请输入(可不填)" />)}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset1}>
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

  renderSimpleForm2() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch2} layout="inline">
        <Row gutter={{ md: 12, lg: 24, xl: 48 }}>
          <Col md={8} sm={12}>
            <FormItem key="eid" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择异常设备">
              {getFieldDecorator('eid')(
                <Select style={{ width: '100%' }}>
                  <Option value="1">KD-36</Option>
                  <Option value="2">KD-43</Option>
                  <Option value="3">KD-44</Option>
                  <Option value="4">KD-47</Option>
                  <Option value="5">KD-48</Option>
                  <Option value="6">KD-42</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={12}>
            <FormItem label="异常处理状态">
              {getFieldDecorator('statussearch')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">异常未解决</Option>
                  <Option value="1">已解决</Option>
                  <Option value="2">报警未解决</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={12}>
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

  renderForm1() {
    const { expandForm } = this.state;
    // return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    return expandForm ? this.renderSimpleForm1(): this.renderSimpleForm1();
  }

  renderForm2() {
    const { expandForm } = this.state;
    // return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    return expandForm ? this.renderSimpleForm2(): this.renderSimpleForm2();
  }

  render() {
    const {
      editerrors: { data1 },
      loading1,
      errorsetting: { data2 },
      loading2,
    } = this.props;
    const { selectedRows, selectedRows1, modalVisible, equipmentmodalVisible,equipmentFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateEquipmentMethods = {
      handleUpdateEquipmentVisible: this.handleUpdateEquipmentVisible,
      handleUpdateEquipment: this.handleUpdateEquipment,
    };
    return (
      <PageHeaderWrapper title="故障记录与管理">
        <Row>
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm1()}</div>
              <StandardTable
                scroll={{x:1872, y: 200 }}
                selectedRows={selectedRows1}
                loading={loading1}
                onSelectRow={this.handleSelectRows1}
                data={data1}
                columns={this.columns1}
              />
            </div>
          </Card>
        </Row>
        <Row style={{paddingTop:'24px'}}>
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderForm2()}</div>
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
                scroll={{x:1400, y:1000}}
                selectedRows={selectedRows}
                loading={loading2}
                data={data2}
                columns={this.columns2}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
        </Row>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
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
