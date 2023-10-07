import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="HomeOuter">
    <Header />
    <div className="homecontainer">
      <div>
        <h1 className="heading1">Find The Job That Fits Your Life</h1>
        <p className="heading2">
          Millions of people are searching for jobs,salary information,
          <br />
          company reviews.Find the job that fits your ability <br />
          and potential
        </p>

        <Link to="/jobs">
          <button type="button" className="homebutton">
            Find Jobs
          </button>
        </Link>
        <Link to="/">Home</Link>
      </div>
    </div>
  </div>
)

export default Home
