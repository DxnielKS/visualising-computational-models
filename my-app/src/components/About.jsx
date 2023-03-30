import React from 'react'

const About = () => {
  return (
    <div>
      <p>This web app allows you to construct your own Turing machine and simulate its output on a certain memory tape. I hope this is useful to you. If you find any bugs, let me know. <br/> There is plans to allow users to upload pictures of handrawn Turing machines and convert them into interactive Turing machines.</p>
      <p>To start, you have the intial state labelled "q0." You can drag in states from the bottom and transitions between states in the canvas. You also can drag in a memory tape and edit it's contents. Once you are happy with your machine, there should be a run button where the simulation should begin.</p>
    </div>
  )
}

export default About