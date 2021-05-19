import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Card, Row, Col } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';

class TableList extends React.Component {
  state = {
    data: {
      "mylist": [{
          "title": "Futurama",
          "id": 1,
          "img": "http://cdn1.nflximg.net/webp/7621/3787621.webp"
        },
        {
          "title": "The Interview",
          "id": 2,
          "img": "http://cdn1.nflximg.net/webp/1381/11971381.webp"
        },
        {
          "title": "Gilmore Girls",
          "id": 3,
          "img": "http://cdn1.nflximg.net/webp/7451/11317451.webp"
        }
      ],
      "recommendations": [{
          "title": "Family Guy",
          "id": 4,
          "img": "http://cdn5.nflximg.net/webp/5815/2515815.webp"
        },
        {
          "title": "The Croods",
          "id": 5,
          "img": "http://cdn3.nflximg.net/webp/2353/3862353.webp"
        },
        {
          "title": "Friends",
          "id": 6,
          "img": "http://cdn0.nflximg.net/webp/3200/9163200.webp"
        }
      ]
    }
  };


  cardItem = (row = {}) => {
    return (
      <Col key={row['id']} className="gutter-row" span={6}>
        <Card extra={<a onClick={()=>{
          let data = this.state.data;
          data['mylist'] = data['mylist'].filter((da) => {
            return da['id'] != row['id']
          });
          data['recommendations'].push(row);
          this.setState({
            data
          });
        }}>Del</a>}>
          <div>
            <span>{row['title']}</span>
          </div>
          <div>
            <img alt='' src={row['img']} style={{width: '50%', height: '50%'}}/>
          </div>
        </Card>
      </Col>
    );
  }

  cardItem2 = (row = {}) => {
    return (
      <Col key={row['id']} className="gutter-row" span={6}>
        <Card extra={<a onClick={()=>{
          let data = this.state.data;
          data['mylist'].push(row);
          data['recommendations'] = data['recommendations'].filter((da) => {
            return da['id'] != row['id']
          });
          this.setState({
            data
          });
        }}>Add</a>}>
          <div>
            <span>{row['title']}</span>
          </div>
          <div>
            <img alt='' src={row['img']} style={{width: '50%', height: '50%'}}/>
          </div>
        </Card>
      </Col>
    );
  }

  render() {
    const { data } = this.state;
    return (
      <PageContainer>
        <Card title="mylist">
          <Row gutter={[16, 24]}>
            {
              data['mylist'] && data['mylist'].map((row) => {
                return this.cardItem(row);
              })
            }
          </Row>
        </Card>
        <Card title="recommendations">
          <Row gutter={[16, 24]}>
            {
              data['recommendations'] && data['recommendations'].map((row) => {
                return this.cardItem2(row);
              })
            }
          </Row>
        </Card>
      </PageContainer>
    );
  }
}

export default TableList;
