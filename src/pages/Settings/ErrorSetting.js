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


const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['error', 'success','warning'];
const status = ['异常未解决', '已解决','预警未解决' ];
const type1 = ['异常信息','预警信息'];
// const eid= ['','KD-33','KD-34','KD-35','KD-36','KD-37','KD-38','KD-39','KD-40','BP-11','BP-12','BP-13','BP-14','BP-15','BP-16','BP-17','BP-18'];
const eid= ['','KD-33','KD-34','KD-35','BP-11','BP-12','BP-13'];
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
@connect(({ errorsetting, loading }) => ({
  errorsetting,
  loading: loading.models.errorsetting,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
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
      title: '异常描述',
      dataIndex: 'desc',
    },
    {
      title: '异常种类',
      dataIndex: 'type',
      filters: [
        {
          text: type1[0],
          value: 0,
        },
        {
          text: type1[1],
          value: 1,
        },
      ],
      render(val) {
        return <span>{type1[val]} </span>;
      },
    },
    {
      title: '异常时间',
      dataIndex: 'error',
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
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateEquipmentVisible(true, record)}>设置</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'errorsetting/fetch',
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
    });

    message.success('添加成功');
    this.handleModalVisible();
  };


  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="设备异常描述">
              {getFieldDecorator('desc')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="处理状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">异常未解决</Option>
                  <Option value="1">已解决</Option>
                  <Option value="2">报警未解决</Option>
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
      errorsetting: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, equipmentmodalVisible,equipmentFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateEquipmentMethods = {
      handleUpdateEquipmentVisible: this.handleUpdateEquipmentVisible,
      handleUpdateEquipment: this.handleUpdateEquipment,
    };
    return (
      <PageHeaderWrapper title="异常管理">
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
