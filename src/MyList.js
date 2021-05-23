import React from 'react';
import './MyList.css';
import logo from './logo.jpg';


const data = require('./data.json');

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      showId: '',
    };

    this.deleteFun = this.deleteFun.bind(this);
    this.addFun = this.addFun.bind(this);
    this.getCard = this.getCard.bind(this);
  }
  
  deleteFun(row = {}){
    let data = this.state.data;
    data['mylist'] = data['mylist'].filter((da) => {
      return da['id'] != row['id'];
    });
    data['recommendations'].push(row);
    this.setState({
      data,
    });
  }
  
  addFun(row = {}){
    let data = this.state.data;
    data['mylist'].push(row);
    data['recommendations'] = data['recommendations'].filter((da) => {
      return da['id'] != row['id'];
    });
    this.setState({
      data,
    });
  }

  getCard(param = {}){
    let data = param['data'];
    let type = param['type'];
    let fun = param['fun'];
    
    return (
      <div
        className="card-main"
        key={data['id']}
        onMouseOver={() => {
          this.setState({
            showId: data['id']
          });
        }}
      >
        <div>
          <span>{data['title']}</span>
          <div>
            <img alt="" src={data['img']}/>
          </div>
          <div style={{height: '20px'}}>
            {
              this.state.showId === data['id'] &&
              <button onClick={
                () => {fun(data)}
              }><span>{type}</span></button>
            }
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { data } = this.state;
    return (
      <div className="main">
        <br/>
        <div>
          <img alt="" src={logo} width={100}/>
        </div>
        <br/>
        <div className="mylist">
          <div>
            <span>MyList</span>
          </div>
          <div className="card-list">
            {
              data['mylist'] && data['mylist'].map((row) => {
                return this.getCard({
                  data: row,
                  type: 'delete',
                  fun: this.deleteFun
                })
              })
            }
          </div>
        </div>
        <div className="recommendations">
          <div>
            <span>Recommendations</span>
          </div>
          <div className="card-list">
            {
              data['recommendations'] && data['recommendations'].map((row) => {
                return this.getCard({
                  data: row,
                  type: 'add',
                  fun: this.addFun
                })
              })
            }
          </div>
        </div>
        <br/>
      </div>
    );
  }
}

export default MyList;