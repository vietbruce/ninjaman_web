import React from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import Container from '../Container'
import './FeaturedServices.css'
import useRouter from 'use-react-router'
import { appContext } from '../../App'
import { ServiceInfo, services } from '../../config/services'
import * as Page from '../../context/navigation'
import { T } from '../../config/translation/util'
import DivImg from '../DivImg'

const FeaturedServices: React.FC = () => {
  const context = React.useContext(appContext)
  const {history} = useRouter()

  const leftArrow = <div className="scroll-menu-arrow">{ '<' }</div>
  const rightArrow = <div className="scroll-menu-arrow">{ '>' }</div>

  const onListingClick = (sv: ServiceInfo) => {
    context.action.setService(sv)
    history.push(Page.serviceDetail(sv).path)
  }

  const mkServiceElems = (services: ServiceInfo[]) => {
    return services.map((sv, idx) => {
      return (
        <div className="featured-listing radius_5 bg_white shadow" key={ idx }
             onClick={ () => onListingClick(sv) }>
          <DivImg url={ sv.image } height={ 150 }/>
          <div className="listing-text">
            <p><b>{ T(sv.name) }</b></p>
          </div>
        </div>
      )
    })
  }

  const mkScrollMenu = (elems: any[]) => {
    return (
      <div className="ScrollMenu">
        <ScrollMenu data={ elems } arrowLeft={ leftArrow } arrowRight={ rightArrow }
                    alignCenter={ false } hideSingleArrow={ true } hideArrows={ true }
                    arrowDisabledClass="is-invisible" dragging={ false } wheel={ false }/>
      </div>
    )
  }

  const featureList = services.map((group, idx) => {
    return (
      <div key={ idx } className="featured-section">
        <p className='title is-4'>{ T(group.name) }</p>
        { mkScrollMenu(mkServiceElems(group.services)) }
      </div>
    )
  })

  return (
    <section className="FeaturedServices section">
      <Container>
        { featureList }
      </Container>
    </section>
  )
}

export default FeaturedServices
