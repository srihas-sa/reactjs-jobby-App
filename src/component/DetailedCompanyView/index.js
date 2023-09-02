import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarCompanies from '../SimilarCompanies'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class DetailedCompanyView extends Component {
  state = {
    companydetails: {},
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
    lifeatcom: [],
    skillsset: [],
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    companylogourl: data.company_logo_url,
    companywebsiteurl: data.company_website_url,
    employmenttype: data.employment_type,
    id: data.id,
    jobdescription: data.job_description,
    skills: data.skills,
    lifeatcompany: data.life_at_company,
    location: data.location,
    packageperannum: data.package_per_annum,
    rating: data.rating,
    similarjobs: data.similar_jobs,
    title: data.title,
  })

  getFormattedData1 = data => ({
    companylogourl: data.company_logo_url,
    employmenttype: data.employment_type,
    id: data.id,
    jobdescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData2 = data => ({
    description: data.description,
    imageurl: data.image_url,
  })

  getFormattedData3 = data => ({
    imageurl: data.image_url,
    name: data.name,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.job_details.life_at_company)
      const updatedData = this.getFormattedData(fetchedData.job_details)

      const updatedSimilarProductsData = fetchedData.similar_jobs.map(
        eachSimilarProduct => this.getFormattedData1(eachSimilarProduct),
      )

      const lifelifeatcom = this.getFormattedData2(
        fetchedData.job_details.life_at_company,
      )

      const updatedSkills = fetchedData.job_details.skills.map(
        eachSimilarProduct => this.getFormattedData3(eachSimilarProduct),
      )
      console.log(lifelifeatcom)
      this.setState({
        companydetails: updatedData,
        similarProductsData: updatedSimilarProductsData,
        skillsset: updatedSkills,
        lifeatcom: lifelifeatcom,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  )

  render() {
    const {
      companydetails,
      similarProductsData,
      lifeatcom,
      skillsset,
    } = this.state
    console.log(lifeatcom)
    const {
      companylogourl,
      employmenttype,
      id,
      jobdescription,
      location,
      packageperannum,
      rating,
      title,
      skills,
      companywebsiteurl,
      lifeatcompany,
    } = companydetails

    return (
      <div className="outerdetailed">
        <Header />
        <div className="individualcompanycard12">
          <div className="indi">
            <img
              src={companylogourl}
              alt="CompanyName"
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
            <div className="divvs">
              <h1 className="Description">Description</h1>
              <a
                href={companywebsiteurl}
                target="_blank"
                rel="noreferrer"
                className="lightblue"
              >
                Visit
              </a>
            </div>

            <p>{jobdescription}</p>
          </div>

          <h1 className="Description">Skills</h1>
          <div className="align2">
            {skillsset.map(eachContact => (
              <div className="align1">
                <img
                  src={eachContact.imageurl}
                  alt="alternative"
                  className="reqskills"
                />
                <h3 className="head3">{eachContact.name}</h3>
              </div>
            ))}
          </div>

          <div>
            <h1 className="Description">Life at Company</h1>
            <div className="align3333">
              <p>{lifeatcom.description}</p>
              <img src={lifeatcom.imageurl} alt="life at company" />
            </div>
          </div>
        </div>
        <h1 className="whitesssss">Similar Jobs</h1>
        <div className="align">
          {similarProductsData.map(eachContact => (
            <SimilarCompanies key={eachContact.id} eachdetail={eachContact} />
          ))}
        </div>
      </div>
    )
  }
}

export default DetailedCompanyView
