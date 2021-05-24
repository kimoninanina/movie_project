import React from 'react';
import { connect } from "react-redux"
import './MyList.css';
import logo from './logo.jpg';

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showId: '',
    };

    this.getCard = this.getCard.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:8888/mylist').then(resp => resp.json()),
      fetch('http://localhost:8888/recommendations').then(resp => resp.json()),
    ]).then(([myList, recommendations]) => {
      this.props.setData({myList, recommendations});
    })
  }

  getCard(param = {}) {
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
            <img alt="" src={data['img']} />
          </div>
          <div style={{ height: '20px' }}>
            {
              this.state.showId === data['id'] &&
              <button onClick={
                () => { fun(data) }
              }><span>{type}</span></button>
            }
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { myList, recommendations } = this.props;
    return (
      <div className="main">
        <br />
        <div>
          <img alt="" src={logo} width={100} />
        </div>
        <br />
        <div className="mylist">
          <div>
            <span>MyList</span>
          </div>
          <div className="card-list">
            {
              myList && myList.map((row) => {
                return this.getCard({
                  data: row,
                  type: 'delete',
                  fun: (row) => this.props.delete(row)
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
              recommendations && recommendations.map((row) => {
                return this.getCard({
                  data: row,
                  type: 'add',
                  fun: (row) => this.props.add(row)
                })
              })
            }
          </div>
        </div>
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    myList: state.myList,
    recommendations: state.recommendations,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setData({myList, recommendations}) {
      dispatch({
        type: "setData",
        payload: {
          myList,
          recommendations
        }
      })
    },
    add(data) {
      dispatch({
        type: "add",
        payload: data
      })
    },
    delete(id) {
      dispatch({
        type: "delete",
        payload: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyList)