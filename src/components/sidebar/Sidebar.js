import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import './sidebar.css';

// TODO: get rid of style and add module CSS
export default class Sidebar extends Component {

  createSidebarItem(page) {
    if (page.title === 'Binding Requests' && !this.props.identity.userParams.isBREnabled) { return; }

    // Determine if page is currently active

    const color = window.location.href.includes(page.url) ? "#FFFFFF" : "#737F8D";
    const menuItem = {
      display: 'flex',
      position: 'relative',
      justifyContent: 'flex-start',
      borderleft: '2px solid #F0F1F1',
      padding: '5px 10px',
      alignItems: 'center',
      height: '25px',
      color: '#85919F',
      fill: '#85919F',
      stroke: '#85919F',
      fontFamily: "'Lato', sans-serif",
    }
    const active = {
      borderLeft: '2px solid #1E5B86',
      background: '#E9EBEB',
      color: '#1E5B86',
      fill: '#1E5B86',
      stroke: '#1E5B86',
    }
    const menuItemText = {
      marginLeft: '13px',
      whiteSpace: 'nowrap',
    }
    const pageActive = window.location.href.includes(page.url) ? Object.assign(menuItem, active) : menuItem;
    // Wrap the icon contents in element styling
    const linkContents = (
      <div style={pageActive} className={`menu_item ${pageActive}`}>
        <div style={{minWidth: '20px'}}>
          {page.icon(color)}
        </div>
        <span style={menuItemText} className='menu_item_text'>{page.title}</span>
      </div>
    );

    const liStyle = {
      padding: '4px 0 4px 0',
      display: 'block',
      overflowX: 'hidden',
    }

    // li with router link or page redirect
    return (
      <li style={liStyle} key={shortid.generate()}>
        { !page.redirect ? <Link to={page.url}>{linkContents}</Link> : <a href={page.url}>{linkContents}</a> }
      </li>
    );
  }

  getSliceRange(x, y) {
    return this.props.sliceArray[x][y];
  }


  render() {
    const mainFont = {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: '12px',
      fontWeight: '300',
      lineHeight: '17px'
    }
    const menuLine = {
      padding: '5px 0',
      margin: 'auto',
      marginBottom: '10px',
      borderBottom: '1px solid #D1D8DC',
      width: '130px'
    }
    const { sidebarListItems } = this.props;
    const arrow = this.props.slideIn ? 'fa-angle-double-right' : 'fa-angle-double-left';
    const sidebarSlider = {
      paddingRight: '5px',
      cursor: 'pointer',
      textAlign: 'right',
      color: '#B8C2CE',
      fontSize: '16px',
      fontFamily: "'Montserrat', sans-serif",
    }
    return (
      <div className='sidebar_list'>
        <div onClick={this.props.handleSlideIn} style={sidebarSlider} className='sidebar_slider'>
          <i className={'fa ' + arrow} aria-hidden="true"></i>
        </div>
        <ul style={mainFont}>
          { sidebarListItems.slice(this.getSliceRange(0,0), this.getSliceRange(0,1)).map((page, i) => this.createSidebarItem(page, i)) }
        </ul>
        <div style={menuLine}></div>
        <ul style={mainFont}>
          { sidebarListItems.slice(this.getSliceRange(1,0), this.getSliceRange(1,1)).map((page, i) => this.createSidebarItem(page, i)) }
        </ul>
        <div style={menuLine}></div>
        <ul style={mainFont}>
          { sidebarListItems.slice(this.getSliceRange(2,0)).map((page, i) => this.createSidebarItem(page, i)) }
        </ul>
      </div>
    );
  }

}

Sidebar.propTypes = {
  handleSlideIn: PropTypes.func.isRequired,
  sidebarListItems: PropTypes.array.isRequired,
  sliceArray: PropTypes.array.isRequired,
  slideIn: PropTypes.bool.isRequired,
  identity: PropTypes.object.isRequired,
};
