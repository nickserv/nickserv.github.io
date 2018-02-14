import React from 'react'

exports.onRenderBody = ({ setHeadComponents }) =>
  setHeadComponents([
    <title key="title">Nick McCurdy</title>,
    <link key="icon" rel="icon" href="/favicon.png" />
  ])
