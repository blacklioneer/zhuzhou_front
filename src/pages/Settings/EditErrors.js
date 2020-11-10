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
// const eid= ['','KD-33','KD-34','KD-35','KD-36','KD-37','KD-38','KD-39','KD-40','BP-11','BP-12','BP-13','BP-14','BP-15','BP-16','BP-17','BP-18'];
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
      title="故障录入"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <FormItem key="id" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="故障编号">
        {form.getFieldDecorator('id',{
          rules: [{ required: true, message: '请输入故障代码！', min: 1 }]})(
            <Input placeholder="请输入故障代码" />
        )}
      </FormItem>
      <FormItem key="type" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择故障类型">
        {form.getFieldDecorator('type')(
          <Select style={{ width: '100%' }}>
            <Option value="机械故障">机械故障</Option>
            <Option value="电气故障">电气故障</Option>
            <Option value="其他">其他</Option>
          </Select>
        )}
      </FormItem>
      <FormItem key="desc" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="故障描述">
        {form.getFieldDecorator('desc',{
          rules: [{ required: true, message: '请输入故障描述！', min: 1 }]})(
            <Input placeholder="请输入故障描述" />
        )}
      </FormItem>
      <FormItem key="reason" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="故障原因">
        {form.getFieldDecorator('reason',)(
          <Input placeholder="请输入故障原因" />
        )}
      </FormItem>
      <FormItem key="solution" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="解决策略">
        {form.getFieldDecorator('solution',)(
          <Input placeholder="请输入解决策略" />
        )}
      </FormItem>
      <FormItem key="date" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="录入时间">
        {form.getFieldDecorator('date')(
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
        id: props.values.id,
        solution: props.values.solution,
        reason: props.values.reason,
        desc: props.values.desc,
        type: props.values.type,
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
      <FormItem key="type" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择异常设备">
        {form.getFieldDecorator('type',{
          initialValue: formVals.type
        })(
          <Select style={{ width: '100%' }}>
            <Option value="机械故障">机械故障</Option>
            <Option value="电气故障">电气故障</Option>
            <Option value="其他">其他</Option>
          </Select>
        )}
      </FormItem>,
      <FormItem key="desc" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="故障描述">
        {form.getFieldDecorator('desc',{
          rules: [{ required: true, message: '请输入故障描述！', min: 1 }],
          initialValue: formVals.desc,})(
            <Input placeholder="请输入故障描述" />
          )}
      </FormItem>,
      <FormItem key="reason" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="故障原因">
        {form.getFieldDecorator('reason',
          {initialValue: formVals.reason})(
            <Input placeholder="请输入故障原因" />
        )}
      </FormItem>,
      <FormItem key="solution" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="解决策略">
        {form.getFieldDecorator('solution',{
          initialValue: formVals.solution
        })(
          <Input placeholder="请输入解决策略" />
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
        title="故障信息修改"
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
@connect(({ editerrors, loading }) => ({
  editerrors,
  loading: loading.models.editerrors,
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
      title: '故障编号',
      dataIndex: 'id',
      sorter:true,
    },
    {
      title: '故障种类',
      dataIndex: 'type',
      filters: [
        {
          text: '机械故障',
          value: '机械故障',
        },
        {
          text: '电气故障',
          value: '电气故障',
        },
        {
          text: '其他',
          value: '其他',
        },
      ],
    },
    {
      title: '故障描述',
      dataIndex: 'desc',
    },
    {
      title: '故障原因',
      dataIndex: 'reason',
    },
    {
      title: '解决策略',
      dataIndex: 'solution',
    },
    {
      title: '录入时间',
      dataIndex: 'date',
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
          <a onClick={() => this.handleUpdateEquipmentVisible(true, record)}>修改</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
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
      type: 'editerrors/fetch',
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
        type: 'editerrors/remove',
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
        type: 'editerrors/fetch',
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
      type: 'editerrors/update',
      payload: {
        query: formValues,
        body: {
          id: fields.id,
          desc: fields.desc,
          type: fields.type,
          date: fields.date,
          solution: fields.solution,
          reason: fields.reason,
        },
      },
      callback: (response) => {
        if (response.error==='AlreadyExit') {
          message.error('修改失败，故障代码重复！！！！')
        } else {
          message.success('修改成功')
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
      type: 'editerrors/add',
      payload: {
        id: fields.id,
        desc: fields.desc,
        type: fields.type,
        date: fields.date,
        solution: fields.solution,
        reason: fields.reason,
      },
      callback: (response) => {
        if (response.error==='AlreadyExit') {
          message.error('添加失败，故障代码重复！！！！')
        } else {
          message.success('添加成功')
        }
      }
    });
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
      editerrors: { data1 },
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
      <PageHeaderWrapper title="故障信息库管理">
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
              data={data1}
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
