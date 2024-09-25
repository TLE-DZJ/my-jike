import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getArticleById, updateArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {
  // 获取频道列表
  const {channelList} = useChannel()
  
  // 提交表单
  const onFinish = (formValue) => {
    console.log(formValue)
    if (imageType !== imageList.length) return message.warning('图片类型和数量不一致')
    const {title, content, channel_id } = formValue
    // 1 按照接口文档的格式处理收集到的表单数据
    const reqData = {
      title,
      content,
      cover: {
        // type为当前的封面模式
        // image为上传的图片列表
        type: imageType,
        // 新增的图片的url在response的data里面
        images: imageList.map(item => {
          if(item.response){
            return  item.response.data.url
          }else {
            return item.url
          }
        })
      },
      channel_id
    }

    // 2 调用接口提交
    // 新增-新增接口 编辑状态-更新接口 有id就是编辑
    if(articleId) {
      // 更新接口
      updateArticleAPI({...reqData, id: articleId})
    } else {
      createArticleAPI(reqData)
    }
    
    message.success('发布文章成功')
  }


  // 上传封面回调
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    console.log('上传中', value)
    setImageList(value.fileList)
    
  }

  // 切换图片封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    console.log('切换图片类型', e.target.value)
    setImageType(e.target.value)
  }

  // 回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')

  // 获取实例 通过form访问Form上的setFiledsValue方法
  const [form] = Form.useForm()

  useEffect(() => {
    // 1 通过id获取数据
    async function getArticleDetail() {
      const res = await getArticleById(articleId)
      const data = res.data 
      const { cover } = data
      form.setFieldsValue({
        ...data,
        type: cover.type
      })
      // 为什么无法回填封面：
      // 数据结构不同：set方法 -> {type: 3}  {cover: {type: 3}}

      // 回填图片列表
      setImageType(cover.type)
      // 显示图片({url:url})
      setImageList(cover.images.map(url => {
        return { url }
      }))
    }
    // 2 调用实例方法 完成回填
    // 有id才能调用
    if(articleId) {
      getArticleDetail()
    }
    getArticleDetail()
  }, [articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? '编辑' : '发布'}文章`},
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* 频道列表渲染 */}
              {/* value属性 用户选中后会自动收集起来作为接口的提交字段 */}
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          {/* 上传封面 */}
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>

            {imageType > 0 && 
            <Upload
              // listType：决定选择文件框的外观样式
              // showUploadList：控制显示上传列表
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              name='image'
              onChange={onChange}
              maxCount={imageType}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 富文本编辑器 */}
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish