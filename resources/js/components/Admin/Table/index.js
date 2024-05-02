/* eslint max-len: 0 */
/* eslint no-unused-vars: 0 */
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import React, { useEffect, useState, createRef }  from "react";
import ReactDOM from "react-dom";
import BootstrapTable from "react-bootstrap-table-next";
import Select from "react-select";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import filterFactory, {
  Comparator,
  customFilter, 
  FILTER_TYPES
} from "react-bootstrap-table2-filter";
import { contextMenu, Item, Menu, Separator, Submenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import ToggleButton from '../../Toggle';
import './styles.scss';

const Table = (props) => {
  const  { Lists, logState=null,cancelCustSub=null } = props
  const [filter, setFilter] = useState(true);
  const [portalReady, setPortalReady] = useState(false);
  let portal = React.createRef();
  const [activeRow, setActiveRow] = useState(null);

  const modalElement = document.createElement('div');

  let filters = [];

  // appends the modal to portal once modal's children are mounted and 
  // removes it once we don't need it in the DOM anymore:
  // useEffect(() => {
  //   modalRoot.appendChild(modalElement);
  //   return () => {
  //     modalRoot.removeChild(modalElement);
  //   };
  // }, [modalElement]);

  const getTextFilter = (onFilter, column) => {
    let ref = React.createRef();
    let clearFilter = () => {
      onFilter();
      if (ref.current) {
        ref.current.value = "";
      }
    };
    filters.push(clearFilter);
    return portalReady
      ? ReactDOM.createPortal(
          <Col style={{ zIndex: "100" }} onClick={(e) => e.stopPropagation()}>
            <FormControl
              ref={ref}
              placeholder="Search Here..."
              className="filter"
              onChange={(event) => onFilter(event.target.value)}
            />
          </Col>,
          document.getElementById("filter-container")
        )
      : null;
  };

  const subPlanStatus = (entry) => {
    if (entry == 1) {
      return (
          'Active'
      );
    } else if (entry == 2) {
      return (
        'Free Trail'
      )

    } else {
      return (
        'Expired'
      );
    }
  }

  const getCustomFilter = (onFilter, column, Lists) => {
    let ref = React.createRef();
    let clearFilter = () => {
      onFilter();
      if (ref.current) {
        ref.current.clearValue();
      }
    };
    filters.push(clearFilter);
    let options =
    Lists.length > 0 ?  
      [...new Set(Lists.map((field) => field[column.dataField]))]
        .sort((a, b) => {
          if (typeof a === "number") {
            return a - b;
          } else {
            return a < b ? -1 : 1;
          }
        })
        .map((entry) => ({
          label: entry,
          value: entry
        }))
      : null
    return portalReady
      ? ReactDOM.createPortal(
          <Col style={{ zIndex: "100" }} onClick={(e) => e.stopPropagation()}>
            <Select
              ref={ref}
              placeholder="Active"
              isClearable
              isMulti
              options={options}
              className="filterSelect"
              onChange={(event) => onFilter(event.map((entry) => entry.value))}
            />
          </Col>,
          document.getElementById("filter-container")
        )
      : null;
  };

  const renderDropDown = ({ options, currSizePerPage, onSizePerPageChange }) => {
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        color: "#0d6efd"
      }),
      control: (provided, state) => ({
        ...provided,
        backgroundColor: "#0d6efd",
        color: "white"
      }),
      singleValue: (provided, state) => ({
        ...provided,
        color: "white"
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "white",
        "&:hover": {
          color: "#bbbbbb"
        }
      }),
      indicatorSeparator: (provided, state) => ({
        ...provided,
        backgroundColor: "white"
      })
    };
    return (
      <>
       (Lists && Lists.length > 0 ) ?
        (
          <Row>
            <Col md={4}>
              <Select
                defaultValue={{ label: 5, value: 5 }}
                isSearchable={false}
                styles={customStyles}
                onChange={(selected) => {
                  onSizePerPageChange(selected.value);
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "5px",
                  backgroundColor: "#0d6efd"
                })}
                options={[
                  { label: 5, value: 5 },
                  { label: 10, value: 10 },
                  { label: 15, value: 15 },
                  { label: "All", value: Lists.length }
                ]}
              />
            </Col>
            <Col
              md={8}
              ref={portal}
              id="setrowlisting"
              className="justify-content-center align-self-center"
            ></Col>
          </Row>
        )

       : '' 
      </>
      
    );
  };

  const renderPageList = (options) => (
    <Col className="react-bootstrap-table-pagination-list" md={6}>
      <ul className="pagination react-bootstrap-table-page-btns-ul float-end">
        {Lists && Lists.length > 0 ? options.pages.map((page) => (
          <li
            key={page.page}
            className={`${page.active ? "active " : ""}page-item`}
            onClick={() => options.onPageChange(page.page)}
          >
            <a href="#" className="page-link">
              {page.page}
            </a>
          </li>
        )) : ''}
      </ul>
    </Col>
  );

  const renderPaginationTotal = (start, to, total) => {
    // null
    portalReady
      ? ReactDOM.createPortal(
          <span>
            {start} to {to} of {total}
          </span>,
          document.getElementById('setrowlisting')
        )
      : null;
  }

  // const showContext = (event, row) => {
  //   setActiveRow(row)
  //   // this.setState({ activeRow: row });
  //   event.preventDefault();
  //   contextMenu.show({
  //     id: "context-menu",
  //     event: event
  //   });
  // };

  // render() {
    // let { activeRow } = this.state;
    
    const rowEvents = {
      onClick: (e, row, index) => setActiveRow(row),
      // onContextMenu: (e, row, index) => {
      //   showContext(e, row);
      // }
    };
    let paginationOptions = {
      Required: 'none',
      sizePerPage: 5,
      firstPageText: "First",
      lastPageText: "Last",
      alwaysShowAllBtns: true,
      showTotal: true,
      sizePerPageRenderer: renderDropDown,
      pageListRenderer: renderPageList,
      paginationTotalRenderer: renderPaginationTotal,
      
    }
    let pagination = paginationFactory();



    const rowStyle = (row) => {
      if (row === activeRow) {
        return {
          backgroundColor: "lightcyan",
          border: "solid 2px grey",
          color: "purple"
        };
      }
    };

    const subscriptionFormatter = (cell, row) => {
      if (cell == 'Active') {
        return (
            <span className="bedge-btn green-bedge">Active</span>
        );
      } else if (cell == 'Free Trail') {
        return (
          <span className="bedge-btn yellow-bedge">Free Trail</span>
        )

      } else if (cell == 'Expired') {
        return (
          <span className="bedge-btn red-bedge">Expired</span>
        )

      } else {
        return (
          <span className="bedge-btn red-bedge">InActive</span>
        );
      }
    }

    const promotedFormatter = (cell, row) => {
      if (cell) {
        return (
            <span className="bedge-btn green-bedge">Yes</span>
        );
      } else {
        return (
          <span className="bedge-btn red-bedge">No</span>
        );
      }
    }

     const nameFormatter = (cell, row) => {
        if (logState) {
            return (
                <Link to={"/admin/business/"+row.id}>{cell}</Link>
            );
        }else{

          return (
              <span>{cell}</span>
          );

        }
      
    }

    const featuredFormatter = (cell, row) => {
      // console.log(row)
      let toogleProps = {
        toggled: cell ? true : false,
        onClick: () => logState(row),
        cancelSub: false
      }
      return (
        <ToggleButton {...toogleProps} />
      );
      
    }

    const cancelSubFormatter = (cell, row) => {
      // console.log(row)
      let toogleProps = {
        toggled: (cell == 'Expired') ? true : false,
        onClick: () => cancelCustSub(row),
        cancelSub: true
      }
      return (
        <ToggleButton {...toogleProps} />
      );
      
    }

    let columns = [
      {
        sort: true,
        dataField: "id",
        text: "USER ID"
      },
      {
        sort: true,
        dataField: "name",
        text: "NAME",
        filter: customFilter({
          type: FILTER_TYPES.TEXT
        }),
        formatter: nameFormatter,
        filterRenderer: (onFilter, column) =>
          getTextFilter(onFilter, column)
      },
      {
        sort: true,
        dataField: "email",
        text: "EMAIL"
      },
      {
        sort: true,
        dataField: "phone",
        text: "PHONE"
      },
      {
        sort: true,
        dataField: "sub_status",
        filter: customFilter({
          type: FILTER_TYPES.MULTISELECT,
          comparator: Comparator.EQ,
        }),
        filterRenderer: (onFilter, column) =>
          getCustomFilter(onFilter, column, Lists),
        text: "Subscription",
        formatter: subscriptionFormatter
      }
    ];
    if (logState) {
      columns.push({
        sort: true,
        dataField: "promote_images",
        text: "SM Permission",
        formatter: promotedFormatter
      })
      columns.push({
        sort: true,
        dataField: "featured",
        text: "Feature",
        formatter: featuredFormatter
      })
    } else {
      columns.push({
        sort: true,
        dataField: "sub_status",
        text: "Subscription Cancel",
        formatter: cancelSubFormatter
      })
    }
    

    const emptyDataMessage = () => { return 'No Data to Display';}

    useEffect(() => {
      // if(portal.current) {
        setPortalReady(true)
      // }
      
    },[])
    useEffect(() => {
      if(Lists && Lists.length > 0) {
        pagination = paginationFactory(paginationOptions)
      }
      
    },[Lists])


    return (
      <div>
        
        <legend />

        <Row hidden={!filter} id="filter-container" className="filter-outer"></Row>
        <legend />
        <BootstrapTable
          keyField="id"
          columns={columns}
          noDataIndication={emptyDataMessage}
          data={Lists}
          rowStyle={rowStyle}
          pagination={pagination}
          filter={filterFactory()}
        />
      </div>
    );
}

export default Table;