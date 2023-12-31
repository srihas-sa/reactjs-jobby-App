import {Link} from 'react-router-dom'
import './index.css'

const IndividualCompany = props => {
  const {eachdetail} = props
  const {
    companylogourl,
    employmenttype,
    id,
    jobdescription,
    location,
    packageperannum,
    rating,
    title,
  } = eachdetail

  return (
    <Link to={`/jobs/${id}`} className="nodecoration">
      <div className="individualcompanycard">
        <div className="indi">
          <img
            src={companylogourl}
            alt="job details company logo"
            className="CompanyName"
          />
          <div className="indi1">
            <h1 className="title">{title}</h1>
            <p className="rating">{rating}</p>
          </div>
        </div>
        <div className="indi123">
          <div className="india">
            <p className="location">{location}</p>
            <p>{employmenttype}</p>
          </div>

          <p>{packageperannum}</p>
        </div>
        <hr
          style={{
            background: '#b6c5ff',
            color: '#b6c5ff',
            borderColor: '#b6c5ff',
            height: '2px',
            width: '100%',
          }}
        />
        <div>
          <h1 className="Description">Description</h1>
          <p>{jobdescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default IndividualCompany
