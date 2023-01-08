import React, { Component } from 'react'
import loading from '../loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <>
      <div className="container text-center">
      <img width={"100px"} src={loading} alt="Loading.." />
      </div>
      </>
    )
  }
}
