import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="HomeOuter">
    <Header />
    <div className="homecontainer">
      <div>
        <h1 className="heading1">
          FIND THE JOB THAT <br /> FITS YOUR LIFE
        </h1>
        <p className="heading2">
          Millions of people are searching for jobs,salary information,
          <br />
          company reviews.Find the job that fits your ability <br />
          and potential
        </p>

        <Link to="/jobs">
          <button type="button">Find Jobs</button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
