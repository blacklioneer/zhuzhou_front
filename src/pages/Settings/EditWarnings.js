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
      title="预警信息录入"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >

      <FormItem key="id" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="故障编号">
        {form.getFieldDecorator('id',{
          rules: [{ required: true, message: '请输入代码！', min: 1 }]})(
            <Input placeholder="请输入预警信息代码" />
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
          <Input placeholder="请输入处理措施" />
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
          <Input placeholder="请输入处理措施" />
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
        title="预警信息修改"
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
@connect(({ editwarnings, loading }) => ({
  editwarnings,
  loading: loading.models.editwarnings,
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
      title: '预警编号',
      dataIndex: 'id',
      sorter:true,
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '原因',
      dataIndex: 'reason',
    },
    {
      title: '处理措施',
      dataIndex: 'solution',
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
      type: 'editwarnings/fetch',
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
      type: 'editwarnings/fetch',
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
      type: 'editwarnings/fetch',
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
        type: 'editwarnings/remove',
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
        type: 'editwarnings/fetch',
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
      type: 'editwarnings/update',
      payload: {
        query: formValues,
        body: {
          id: fields.id,
          desc: fields.desc,
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
      type: 'editwarnings/add',
      payload: {
        id: fields.id,
        desc: fields.desc,
        infotype: fields.infotype,
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
      editwarnings: { data1 },
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
      <PageHeaderWrapper title="预警信息库管理">
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
