import React, { Component } from 'react';
import {connect} from 'react-redux'
import R from 'ramda'
import {changeImageUrl} from '../../actions/image'
import {widgetAction} from '../../actions/common'

const ImageSettings = ({url, onUrlChange}) =>
  (<div>
      <label>Url:</label>
      <input type="text" value={url} onChange={onUrlChange}/>
  </div>)

const Image = ({urlFn, width, height, isEditing, id, onUrlChange}) =>
{
  const url = urlFn(id)
  return isEditing? <ImageSettings url={url} onUrlChange={onUrlChange(id)}/>
          : <img src={url} width={width} height={height}/>
}

const mapStateToProps = (state) => {
  return {
    urlFn: (id) => state.panels[id].widget.state.url || ''
  }
}

const mapDispatchToProps = (dispatch) => ({
  onUrlChange: (id) => {
    return (e) => {
      dispatch(widgetAction(id, changeImageUrl(e.target.value)))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Image)
