import React from "react";
const findHTML = () => {
  return {
    __html:
      '<iframe src="/muzze/home.html" width="100%" height="1000px"></iframe>',
  };
};
const Test = () => {
  //return <div dangerouslySetInnerHTML={findHTML()} />;
  return (
    <div>
      <>
        {/* set the encoding of your site */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* set the page title */}
        <title>Muzze - Museum &amp; Art Gallery Exhibition HTML Template</title>
        {/* inlcude google archivo & lora font cdn link */}
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Muli:ital@0;1&family=Merriweather&display=swap"
          rel="stylesheet"
        />
        {/* include the site bootstrap stylesheet */}
        <link rel="stylesheet" href="css/bootstrap.css" />
        {/* include the site stylesheet */}
        <link rel="stylesheet" href="style.css" />
        {/* include the site responsive stylesheet */}
        <link rel="stylesheet" href="css/responsive.css" />
        {/* pageWrapper */}
        <div id="pageWrapper">
          <div className="phStickyWrap phVi w-100">
            {/* pageHeader */}
            <header
              id="pageHeader"
              className="position-absolute w-100 bg-white"
            >
              {/* hTopHolder */}
              <div className="hTopHolder pt-2 pb-2 pt-lg-4 pb-lg-5">
                <div className="container">
                  <div className="row">
                    <div className="col-4 col-sm-3 col-lg-2">
                      {/* logo */}
                      <div className="logo mt-1">
                        <a href="home.html">
                          <img
                            src="images/logo.png"
                            className="img-fluid"
                            alt="Muzze || Art & History Museum"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-8 col-sm-9 col-lg-10">
                      <div className="d-flex align-items-center justify-content-end w-100">
                        {/* hthTime */}
                        <time
                          className="hthTime d-none d-md-block"
                          dateTime="2011-01-12"
                        >
                          <i className="far fa-clock icn text-brown align-middle mr-1" />
                          Open Daily 9:30–6:00, Monday Until 8:00
                        </time>
                        {/* btn */}
                        <a
                          href="javascript:void(0);"
                          data-toggle="modal"
                          data-target="#exampleModalLong"
                          className="btn btnSmMinWidth btn-outline-secondary btn-sm text-capitalize bdr2 ml-7 hdBtn mr-18 mr-md-0"
                        >
                          tickets
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hdHolder headerFixer">
                <div className="container">
                  {/* navbar */}
                  <nav className="navbar navbar-expand-md navbar-light d-block px-0 pt-0 pb-0 pt-md-2 pb-md-2 pt-lg-3">
                    <div className="row">
                      <div className="col-9 position-static">
                        {/* navbar collapse */}
                        <div
                          className="collapse navbar-collapse pageNavigationCollapse"
                          id="pageNavigationCollapse"
                        >
                          {/* mainNavigation */}
                          <ul className="navbar-nav mainNavigation text-capitalize">
                            <li className="nav-item active dropdown">
                              <a
                                className="nav-link"
                                href="javascript:void(0);"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Home
                              </a>
                              {/* dropdown menu */}
                              <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                                {/* mnDropList */}
                                <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                  <li>
                                    <a href="home.html">Home Default</a>
                                  </li>
                                  <li>
                                    <a href="home-classic.html">Home Classic</a>
                                  </li>
                                  <li>
                                    <a href="home-creative.html">
                                      Home Creative
                                    </a>
                                  </li>
                                  <li>
                                    <a href="home-fullscreen.html">
                                      Home FullScreen
                                    </a>
                                  </li>
                                  <li>
                                    <a href="home-exhibition.html">
                                      Home Exhibition
                                    </a>
                                  </li>
                                  <li>
                                    <a href="home-modern.html">Home Modern</a>
                                  </li>
                                  <li>
                                    <a href="home-minimal.html">Home Minimal</a>
                                  </li>
                                  <li>
                                    <a href="home-simple-boxed.html">
                                      Home Simple Boxed
                                    </a>
                                  </li>
                                  <li>
                                    <a href="home-parallax.html">
                                      Home Parallax
                                    </a>
                                  </li>
                                  <li>
                                    <a href="home-event.html">Home Event</a>
                                  </li>
                                  <li>
                                    <a href="/RatingList">테스트</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li className="nav-item dropdown">
                              <a
                                className="nav-link"
                                href="javascript:void(0);"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                What’s On
                              </a>
                              {/* dropdown menu */}
                              <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                                {/* mnDropList */}
                                <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                  <li className="hasDropdown">
                                    <a href="javascript:void(0);">
                                      Event &amp; Programs
                                    </a>
                                    {/* mnDropList */}
                                    <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                      <li>
                                        <a href="events-list.html">
                                          Event List
                                        </a>
                                      </li>
                                      <li>
                                        <a href="event-grid.html">Event Grid</a>
                                      </li>
                                      <li>
                                        <a href="event-compact.html">
                                          Event Compact
                                        </a>
                                      </li>
                                      <li>
                                        <a href="single-events.html">
                                          Single Event
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li className="hasDropdown">
                                    <a href="javascript:void(0);">Exhibition</a>
                                    {/* mnDropList */}
                                    <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                      <li>
                                        <a href="exhibition-list.html">
                                          Exhibition List
                                        </a>
                                      </li>
                                      <li>
                                        <a href="exhibition-grid.html">
                                          Exhibition Grid
                                        </a>
                                      </li>
                                      <li>
                                        <a href="exhibition-compact.html">
                                          Exhibition Compact
                                        </a>
                                      </li>
                                      <li>
                                        <a href="single-exhibition.html">
                                          Exhibition Event
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li className="nav-item dropdown">
                              <a
                                className="nav-link"
                                href="javascript:void(0);"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Visit
                              </a>
                              {/* dropdown menu */}
                              <div className="dropdown-menu mndDropMenu p-0">
                                {/* mnDropList */}
                                <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                  <li>
                                    <a href="visit-us-block.html">
                                      Plan Your Visit
                                    </a>
                                  </li>
                                  <li>
                                    <a href="visit-us-block.html">
                                      Hours &amp; Admission
                                    </a>
                                  </li>
                                  <li>
                                    <a href="visit-us-block.html">Directions</a>
                                  </li>
                                  <li>
                                    <a href="visit-us-block.html">
                                      Accessibility
                                    </a>
                                  </li>
                                  <li>
                                    <a href="visit-us-block.html">
                                      Group Tours
                                    </a>
                                  </li>
                                  <li>
                                    <a href="visit-us-block.html">Rental</a>
                                  </li>
                                  <li>
                                    <a href="visit-us-block.html">
                                      Other Facilities
                                    </a>
                                  </li>
                                </ul>
                                {/* mndAdress */}
                                <address className="mndAdress position-absolute text-gray888 mb-0">
                                  <strong className="d-block mb-1 mndaTitle font-weight-normal fontSerif text-graydfdfdf">
                                    Hours
                                  </strong>
                                  <p className="mb-5">
                                    <time dateTime="2011-01-12">
                                      Daily 9.30 am–6.00 pm
                                    </time>
                                  </p>
                                  <strong className="d-block mndaTitle font-weight-normal mb-1 fontSerif text-graydfdfdf">
                                    Location
                                  </strong>
                                  <p className="mb-5">
                                    2270 S Real Camino Lake California, US 90967
                                  </p>
                                  <a
                                    href="javascript:void(0);"
                                    className="mndLink text-uppercase"
                                  >
                                    <i className="fas fa-map-marker-alt icn">
                                      <span className="sr-only">icon</span>
                                    </i>
                                    Geting Here
                                  </a>
                                </address>
                              </div>
                            </li>
                            <li className="nav-item dropdown">
                              <a
                                className="nav-link"
                                href="javascript:void(0);"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                About
                              </a>
                              {/* dropdown menu */}
                              <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                                {/* mnDropList */}
                                <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                  <li>
                                    <a href="mission-history.html">
                                      Mission &amp; History
                                    </a>
                                  </li>
                                  <li>
                                    <a href="board-staff.html">
                                      On Board &amp; Staff
                                    </a>
                                  </li>
                                  <li>
                                    <a href="career.html">Career</a>
                                  </li>
                                  <li>
                                    <a href="sponsers.html">Sponsers</a>
                                  </li>
                                  <li>
                                    <a href="contact-us.html">Contact Us</a>
                                  </li>
                                  <li>
                                    <a href="membership.html">Membership</a>
                                  </li>
                                  <li>
                                    <a href="donate.html">Donate</a>
                                  </li>
                                  <li>
                                    <a href="facility-rental.html">
                                      Facility Rental
                                    </a>
                                  </li>
                                  <li>
                                    <a href="career-details.html">
                                      Career Details
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li className="nav-item dropdown">
                              <a
                                className="nav-link"
                                href="javascript:void(0);"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Collections
                              </a>
                              {/* dropdown menu */}
                              <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                                {/* mnDropList */}
                                <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                  <li>
                                    <a href="collection-type-1.html">
                                      Collection Type-1
                                    </a>
                                  </li>
                                  <li>
                                    <a href="collection-type-2.html">
                                      Collection Type-2
                                    </a>
                                  </li>
                                  <li>
                                    <a href="single-works.html">Single Works</a>
                                  </li>
                                  <li>
                                    <a href="artists.html">Artists</a>
                                  </li>
                                  <li>
                                    <a href="single-artist.html">
                                      Single Artist
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                            <li className="nav-item dropdown">
                              <a
                                className="nav-link"
                                href="javascript:void(0);"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Pages
                              </a>
                              {/* dropdown menu */}
                              <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                                {/* mnDropList */}
                                <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                  <li className="hasDropdown">
                                    <a href="javascript:void(0);">News</a>
                                    {/* mnDropList */}
                                    <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                      <li>
                                        <a href="news-grid.html">News Grid</a>
                                      </li>
                                      <li>
                                        <a href="news-list.html">
                                          News Grid W/S
                                        </a>
                                      </li>
                                      <li>
                                        <a href="news-classic.html">
                                          News Classic
                                        </a>
                                      </li>
                                      <li>
                                        <a href="single-post.html">
                                          Single Post
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li className="hasDropdown">
                                    <a href="javascript:void(0);">Shop</a>
                                    {/* mnDropList */}
                                    <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                      <li>
                                        <a href="shop.html">Shop</a>
                                      </li>
                                      <li>
                                        <a href="single-product.html">
                                          Single Product
                                        </a>
                                      </li>
                                      <li>
                                        <a href="cart.html">Cart</a>
                                      </li>
                                      <li>
                                        <a href="checkout.html">Checkout</a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li className="hasDropdown">
                                    <a href="javascript:void(0);">
                                      Image Gallery
                                    </a>
                                    {/* mnDropList */}
                                    <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                                      <li>
                                        <a href="image-gallery.html">
                                          Image Gallery
                                        </a>
                                      </li>
                                      <li>
                                        <a href="gallery-grid.html">
                                          Gallery Grid
                                        </a>
                                      </li>
                                      <li>
                                        <a href="gallery-masonry.html">
                                          Gallery Masonry
                                        </a>
                                      </li>
                                      <li>
                                        <a href="gallery-caption.html">
                                          Gallery Caption
                                        </a>
                                      </li>
                                      <li>
                                        <a href="gallery-fullwidth.html">
                                          Gallery Fullwidth
                                        </a>
                                      </li>
                                    </ul>
                                  </li>
                                  <li>
                                    <a href="venues.html">Venues</a>
                                  </li>
                                  <li>
                                    <a href="faq.html">Faq</a>
                                  </li>
                                  <li>
                                    <a href="my-account.html">My Account</a>
                                  </li>
                                  <li>
                                    <a href="404-page.html">404 Error</a>
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-3 position-static">
                        <div className="d-flex justify-content-end align-items-center w-100">
                          {/* hdSearchForm */}
                          <form action="#" className="hdSearchForm">
                            {/* hdSearchOpener */}
                            <a
                              className="hdSearchOpener d-block"
                              data-toggle="collapse"
                              href="#hdSearchFieldCollapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="hdSearchFieldCollapse"
                            >
                              <i className="icomoon-search">
                                <span className="sr-only">search</span>
                              </i>
                            </a>
                            {/* hdSearchFieldCollapse */}
                            <div
                              className="collapse hdSearchFieldCollapse position-fixed w-100 h-100 d-flex align-items-center"
                              id="hdSearchFieldCollapse"
                            >
                              {/* hdsfcHolder */}
                              <div className="hdsfcHolder w-100 mx-auto py-4 px-3">
                                <strong className="d-block font-weight-normal mb-2">
                                  Type anything to Find in Pages
                                </strong>
                                <div className="input-group">
                                  <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search…"
                                  />
                                  <div className="input-group-append">
                                    <button
                                      className="btn btn-secondary"
                                      type="button"
                                    >
                                      <i className="icomoon-search">
                                        <span className="sr-only">search</span>
                                      </i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <a
                                className="hdSearchClose d-flex align-items-center justify-content-center position-absolute"
                                data-toggle="collapse"
                                href="#hdSearchFieldCollapse"
                                role="button"
                                aria-expanded="true"
                                aria-controls="hdSearchFieldCollapse"
                              >
                                <i className="fas fa-times">
                                  <span className="sr-only">search</span>
                                </i>
                              </a>
                            </div>
                          </form>
                          {/* hdMenuOpener */}
                          <a
                            href="javascript:void(0);"
                            className="hdMenuOpener hdSideMenuOpener position-relative ml-4 d-none d-md-block"
                          >
                            <span className="icnBar position-absolute">
                              <span className="sr-only">menu</span>
                            </span>
                          </a>
                          {/* navbar toggler */}
                          <button
                            className="navbar-toggler pgNavOpener position-absolute"
                            type="button"
                            data-toggle="collapse"
                            data-target="#pageNavigationCollapse"
                            aria-controls="pageNavigationCollapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                          >
                            <span className="navbar-toggler-icon">
                              <span className="sr-only">menu</span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
              <nav className="navbar navbar-light d-flex flex-column navbarSide position-fixed h-100 px-6 pt-10 pb-6 px-md-10 pb-md-10">
                <ul className="navbar-nav mainNavigation w-100 flex-grow-1 mainSideNavigation text-capitalize d-block">
                  <li className="nav-item active dropdown">
                    <a
                      className="nav-link"
                      href="javascript:void(0);"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Home
                    </a>
                    {/* dropdown menu */}
                    <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                      {/* mnDropList */}
                      <ul className="list-unstyled mnDropList mb-0">
                        <li>
                          <a href="home.html">Home Default</a>
                        </li>
                        <li>
                          <a href="home-classic.html">Home Classic</a>
                        </li>
                        <li>
                          <a href="home-creative.html">Home Creative</a>
                        </li>
                        <li>
                          <a href="home-fullscreen.html">Home FullScreen</a>
                        </li>
                        <li>
                          <a href="home-exhibition.html">Home Exhibition</a>
                        </li>
                        <li>
                          <a href="home-modern.html">Home Modern</a>
                        </li>
                        <li>
                          <a href="home-minimal.html">Home Minimal</a>
                        </li>
                        <li>
                          <a href="home-simple-boxed.html">Home Simple Boxed</a>
                        </li>
                        <li>
                          <a href="home-parallax.html">Home Parallax</a>
                        </li>
                        <li>
                          <a href="home-event.html">Home Event</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link"
                      href="javascript:void(0);"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      What’s On
                    </a>
                    {/* dropdown menu */}
                    <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                      {/* mnDropList */}
                      <ul className="list-unstyled mnDropList mb-0">
                        <li className="hasDropdown">
                          <a href="javascript:void(0);">Event &amp; Programs</a>
                          {/* mnDropList */}
                          <ul className="list-unstyled mnDropList mb-0">
                            <li>
                              <a href="events-list.html">Event List</a>
                            </li>
                            <li>
                              <a href="event-grid.html">Event Grid</a>
                            </li>
                            <li>
                              <a href="event-compact.html">Event Compact</a>
                            </li>
                            <li>
                              <a href="single-events.html">Single Event</a>
                            </li>
                          </ul>
                        </li>
                        <li className="hasDropdown">
                          <a href="javascript:void(0);">Exhibition</a>
                          {/* mnDropList */}
                          <ul className="list-unstyled mnDropList mb-0">
                            <li>
                              <a href="exhibition-list.html">Exhibition List</a>
                            </li>
                            <li>
                              <a href="exhibition-grid.html">Exhibition Grid</a>
                            </li>
                            <li>
                              <a href="exhibition-compact.html">
                                Exhibition Compact
                              </a>
                            </li>
                            <li>
                              <a href="single-exhibition.html">
                                Exhibition Event
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link"
                      href="javascript:void(0);"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Visit
                    </a>
                    {/* dropdown menu */}
                    <div className="dropdown-menu mndDropMenu p-0">
                      {/* mnDropList */}
                      <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                        <li>
                          <a href="visit-us-block.html">Plan Your Visit</a>
                        </li>
                        <li>
                          <a href="visit-us-block.html">
                            Hours &amp; Admission
                          </a>
                        </li>
                        <li>
                          <a href="visit-us-block.html">Directions</a>
                        </li>
                        <li>
                          <a href="visit-us-block.html">Accessibility</a>
                        </li>
                        <li>
                          <a href="visit-us-block.html">Group Tours</a>
                        </li>
                        <li>
                          <a href="visit-us-block.html">Rental</a>
                        </li>
                        <li>
                          <a href="visit-us-block.html">Other Facilities</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link"
                      href="javascript:void(0);"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      About
                    </a>
                    {/* dropdown menu */}
                    <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                      {/* mnDropList */}
                      <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                        <li>
                          <a href="mission-history.html">
                            Mission &amp; History
                          </a>
                        </li>
                        <li>
                          <a href="board-staff.html">On Board &amp; Staff</a>
                        </li>
                        <li>
                          <a href="career.html">Career</a>
                        </li>
                        <li>
                          <a href="sponsers.html">Sponsers</a>
                        </li>
                        <li>
                          <a href="contact-us.html">Contact Us</a>
                        </li>
                        <li>
                          <a href="membership.html">Membership</a>
                        </li>
                        <li>
                          <a href="donate.html">Donate</a>
                        </li>
                        <li>
                          <a href="facility-rental.html">Facility Rental</a>
                        </li>
                        <li>
                          <a href="career-details.html">Career Details</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link"
                      href="javascript:void(0);"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Collections
                    </a>
                    {/* dropdown menu */}
                    <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                      {/* mnDropList */}
                      <ul className="list-unstyled mnDropList mb-0 pt-1 pb-1 pt-md-4 pb-md-6">
                        <li>
                          <a href="collection-type-1.html">Collection Type-1</a>
                        </li>
                        <li>
                          <a href="collection-type-2.html">Collection Type-2</a>
                        </li>
                        <li>
                          <a href="single-works.html">Single Works</a>
                        </li>
                        <li>
                          <a href="artists.html">Artists</a>
                        </li>
                        <li>
                          <a href="single-artist.html">Single Artist</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link"
                      href="javascript:void(0);"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Pages
                    </a>
                    {/* dropdown menu */}
                    <div className="dropdown-menu mndDropMenu mndDropMenuSmall p-0">
                      {/* mnDropList */}
                      <ul className="list-unstyled mnDropList mb-0">
                        <li className="hasDropdown">
                          <a href="javascript:void(0);">News</a>
                          {/* mnDropList */}
                          <ul className="list-unstyled mnDropList mb-0">
                            <li>
                              <a href="news-grid.html">News Grid</a>
                            </li>
                            <li>
                              <a href="news-list.html">News Grid W/S</a>
                            </li>
                            <li>
                              <a href="news-classic.html">News Classic</a>
                            </li>
                            <li>
                              <a href="single-post.html">Single Post</a>
                            </li>
                          </ul>
                        </li>
                        <li className="hasDropdown">
                          <a href="javascript:void(0);">Shop</a>
                          {/* mnDropList */}
                          <ul className="list-unstyled mnDropList mb-0">
                            <li>
                              <a href="shop.html">Shop</a>
                            </li>
                            <li>
                              <a href="single-product.html">Single Product</a>
                            </li>
                            <li>
                              <a href="cart.html">Cart</a>
                            </li>
                            <li>
                              <a href="checkout.html">Checkout</a>
                            </li>
                          </ul>
                        </li>
                        <li className="hasDropdown">
                          <a href="javascript:void(0);">Image Gallery</a>
                          {/* mnDropList */}
                          <ul className="list-unstyled mnDropList mb-0">
                            <li>
                              <a href="image-gallery.html">Image Gallery</a>
                            </li>
                            <li>
                              <a href="gallery-grid.html">Gallery Grid</a>
                            </li>
                            <li>
                              <a href="gallery-masonry.html">Gallery Masonry</a>
                            </li>
                            <li>
                              <a href="gallery-caption.html">Gallery Caption</a>
                            </li>
                            <li>
                              <a href="gallery-fullwidth.html">
                                Gallery Fullwidth
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <a href="venues.html">Venues</a>
                        </li>
                        <li>
                          <a href="faq.html">Faq</a>
                        </li>
                        <li>
                          <a href="my-account.html">My Account</a>
                        </li>
                        <li>
                          <a href="404-page.html">404 Error</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <div className="nvbBottomWrap w-100 flex-shrink-0 text-gray888 pt-10 pb-1">
                  <address className="mb-0">
                    <p>
                      <a
                        href="tel:16179876543"
                        className="colorInherit textDecorationNone"
                      >
                        1 (617) 987-6543
                      </a>
                      <br />
                      <a
                        href="mailto:info@museumwp.com"
                        className="colorInherit textDecorationNone"
                      >
                        info@museumwp.com
                      </a>
                    </p>
                    <ul className="list-unstyled socialNetworks ftSocialNetworks ftSocialNetworksVix d-flex flex-wrap mb-2 mt-11">
                      <li>
                        <a href="javascript:void(0);">
                          <i className="fab fa-twitter" aria-hidden="true">
                            <span className="sr-only">twitter</span>
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <i className="fab fa-pinterest" aria-hidden="true">
                            <span className="sr-only">pinterest</span>
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <i className="fab fa-facebook-f" aria-hidden="true">
                            <span className="sr-only">facebook</span>
                          </i>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">
                          <i className="fab fa-instagram" aria-hidden="true">
                            <span className="sr-only">instagram</span>
                          </i>
                        </a>
                      </li>
                    </ul>
                    <ul className="list-unstyled ftTermLinks ftTermLinksVix d-flex flex-wrap mb-0">
                      <li>
                        <a href="javascript:void(0);">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);">Terms of Use</a>
                      </li>
                    </ul>
                  </address>
                </div>
                <a
                  href="javascript:void(0);"
                  className="hdMenuOpener hdSideMenuOpener position-absolute"
                >
                  <span className="icnBar position-absolute">
                    <span className="sr-only">menu</span>
                  </span>
                </a>
              </nav>
            </header>
          </div>
          <main>
            {/* bsSlidViv */}
            <div className="bsSlidViv">
              <div>
                {/* introBannerBlock */}
                <section
                  className="introBannerBlock hdIsVi w-100 text-center text-white position-relative d-flex bgCover"
                  style={{
                    backgroundImage:
                      "url(https://via.placeholder.com/1920x900)",
                  }}
                >
                  <div className="ibbAlignHolder w-100 d-flex align-items-center">
                    <div className="ibbHolder w-100 py-6">
                      <div className="container holder position-relative">
                        <div className="row">
                          <div className="col-12 col-md-8 offset-md-2">
                            <strong className="d-block fontSerif mainHeadingTitle font-weight-normal mb-4">
                              Currently Onview -
                              <time dateTime="2011-01-12">14 May 2020</time>
                            </strong>
                            <h1 className="text-white ibbHeading mb-8">
                              The Upstairs Room of A art Taminiau
                            </h1>
                            <a
                              href="javascript:void(0);"
                              className="btn btn-dark btnDarkInverse align-top btnMdMinWidth"
                            >
                              View Details
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div>
                {/* introBannerBlock */}
                <section
                  className="introBannerBlock hdIsVi w-100 text-center text-white position-relative d-flex bgCover"
                  style={{
                    backgroundImage: "url(http://placehold.it/1920x900)",
                  }}
                >
                  <div className="ibbAlignHolder w-100 d-flex align-items-center">
                    <div className="ibbHolder w-100 py-6">
                      <div className="container holder position-relative">
                        <div className="row">
                          <div className="col-12 col-md-8 offset-md-2">
                            <strong className="d-block fontSerif mainHeadingTitle font-weight-normal mb-4">
                              Currently Onview -
                              <time dateTime="2011-01-12">14 May 2020</time>
                            </strong>
                            <h1 className="text-white ibbHeading mb-8">
                              The Upstairs Room of A Taminiau
                            </h1>
                            <a
                              href="javascript:void(0);"
                              className="btn btn-dark btnDarkInverse align-top btnMdMinWidth"
                            >
                              View Details
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div>
                {/* introBannerBlock */}
                <section
                  className="introBannerBlock hdIsVi w-100 text-center text-white position-relative d-flex bgCover"
                  style={{
                    backgroundImage: "url(http://placehold.it/1920x900)",
                  }}
                >
                  <div className="ibbAlignHolder w-100 d-flex align-items-center">
                    <div className="ibbHolder w-100 py-6">
                      <div className="container holder position-relative">
                        <div className="row">
                          <div className="col-12 col-md-8 offset-md-2">
                            <strong className="d-block fontSerif mainHeadingTitle font-weight-normal mb-4">
                              Currently Onview -
                              <time dateTime="2011-01-12">14 May 2020</time>
                            </strong>
                            <h1 className="text-white ibbHeading mb-8">
                              The Upstairs Room of A art
                            </h1>
                            <a
                              href="javascript:void(0);"
                              className="btn btn-dark btnDarkInverse align-top btnMdMinWidth"
                            >
                              View Details
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            {/* scheduleDetailsAside */}
            <aside className="scheduleDetailsAside bg-secondary text-gray888 pt-5 pt-md-8 pb-1 pb-md-4">
              <div className="container">
                <div className="row px-xl-6">
                  <div className="col-12 col-md-4 col">
                    {/* sdaColumn */}
                    <div className="sdaColumn d-flex mb-6">
                      <span className="icnWrap d-block mr-3 mr-xl-6 flex-shrink-0 mt-2">
                        <img
                          src="images/icn01.svg"
                          className="img-fluid"
                          width={48}
                          height={49}
                          alt="icon"
                        />
                      </span>
                      <div className="descrWrap">
                        <strong className="h h3 d-block font-weight-normal text-graydfdfdf mb-2">
                          Hours
                        </strong>
                        <p className="mb-5">Daily 9.30 am–6.00 pm</p>
                        <a
                          href="javascript:void(0);"
                          className="btn btnGr999 btnGr999Outline bdr2 align-top btn-sm"
                        >
                          See All Hours
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col">
                    {/* sdaColumn */}
                    <div className="sdaColumn d-flex mb-6">
                      <span className="icnWrap d-block mr-3 mr-xl-6 flex-shrink-0 mt-2">
                        <img
                          src="images/icn02.svg"
                          className="img-fluid"
                          width={48}
                          height={47}
                          alt="icon"
                        />
                      </span>
                      <div className="descrWrap">
                        <strong className="h h3 d-block font-weight-normal text-graydfdfdf mb-2">
                          Location
                        </strong>
                        <p className="mb-5">
                          2270 S Real Camino Lake California, US 90967
                        </p>
                        <a
                          href="javascript:void(0);"
                          className="btn btnGr999 btnGr999Outline bdr2 align-top btn-sm"
                        >
                          Getting Here
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col">
                    {/* sdaColumn */}
                    <div className="sdaColumn d-flex mb-6">
                      <span className="icnWrap d-block mr-3 mr-xl-6 flex-shrink-0 mt-2">
                        <img
                          src="images/icn03.svg"
                          className="img-fluid"
                          width={48}
                          height={49}
                          alt="icon"
                        />
                      </span>
                      <div className="descrWrap">
                        <strong className="h h3 d-block font-weight-normal text-graydfdfdf mb-2">
                          Ticket
                        </strong>
                        <p className="mb-5">
                          Like to Visit the Museum? Tickets are only available
                          online
                        </p>
                        <a
                          href="javascript:void(0);"
                          className="btn btnGr999 btnGr999Outline bdr2 align-top btn-sm"
                        >
                          Buy Online
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            {/* currentExibitionBlock */}
            <section className="currentExibitionBlock hasBdr pt-6 pt-md-9 pt-lg-14 pt-xl-20 pb-6 pb-lg-10 pb-xl-16">
              <div className="container">
                {/* teeSideHead */}
                <header className="teeSideHead mb-6 mb-lg-11">
                  <div className="row align-items-center">
                    <div className="col-12 col-md-8">
                      <h1 className="text-capitalize mb-0">Currently Onview</h1>
                    </div>
                    <div className="col-12 col-md-4 text-right">
                      <a
                        href="single-exhibition.html"
                        className="d-none d-md-inline-block align-top teeSeeAllBtn mt-2"
                      >
                        See All Exhibitions
                        <i className="icomoon-arrowCircleRight align-middle icn ml-1">
                          <span className="sr-only">icon</span>
                        </i>
                      </a>
                    </div>
                  </div>
                </header>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-4">
                    {/* currExibitColumn */}
                    <article className="currExibitColumn mb-6 mx-auto">
                      <div className="imgHolder mb-3 mb-lg-6">
                        <a href="single-exhibition.html">
                          <img
                            src="http://placehold.it/365x270"
                            className="img-fluid w-100 d-block"
                            alt="image description"
                          />
                        </a>
                      </div>
                      <strong className="catagoryTitle d-block font-weight-normal text-uppercase mb-2">
                        Exhibition
                      </strong>
                      <h2 className="mb-3">
                        <a href="single-exhibition.html">
                          Mutiny: Works by Géricault
                        </a>
                      </h2>
                      <time
                        dateTime="2011-01-12"
                        className="d-block cecTime text-gray777"
                      >
                        13 Oct 2018 - 15 Feb 2020
                      </time>
                    </article>
                  </div>
                  {/* currExibitColumn */}
                  <div className="col-12 col-sm-6 col-md-4">
                    <article className="currExibitColumn mb-6 mx-auto">
                      <div className="imgHolder mb-3 mb-lg-6">
                        <a href="single-exhibition.html">
                          <img
                            src="http://placehold.it/365x270"
                            className="img-fluid w-100 d-block"
                            alt="image description"
                          />
                        </a>
                      </div>
                      <strong className="catagoryTitle d-block font-weight-normal text-uppercase mb-2">
                        Now On view
                      </strong>
                      <h2 className="mb-3">
                        <a href="single-exhibition.html">
                          Palileo Descent VR with tim Creek
                        </a>
                      </h2>
                      <time
                        dateTime="2011-01-12"
                        className="d-block cecTime text-gray777"
                      >
                        Open 12:30 - 1:00 Daily
                      </time>
                    </article>
                  </div>
                  {/* currExibitColumn */}
                  <div className="col-12 col-sm-6 col-md-4">
                    <article className="currExibitColumn mb-6 mx-auto">
                      <div className="imgHolder mb-3 mb-lg-6">
                        <a href="single-exhibition.html">
                          <img
                            src="http://placehold.it/365x270"
                            className="img-fluid w-100 d-block"
                            alt="image description"
                          />
                        </a>
                      </div>
                      <strong className="catagoryTitle d-block font-weight-normal text-uppercase mb-2">
                        Exhibition
                      </strong>
                      <h2 className="mb-3">
                        <a href="single-exhibition.html">
                          Michel Wernar Gallery
                        </a>
                      </h2>
                      <time
                        dateTime="2011-01-12"
                        className="d-block cecTime text-gray777"
                      >
                        25 Oct 2018 - 10 May 2020
                      </time>
                    </article>
                  </div>
                </div>
                {/* btnWrap */}
                <div className="btnWrap text-center">
                  <a
                    href="single-exhibition.html"
                    className="d-inline-block d-md-none align-top teeSeeAllBtn mt-2"
                  >
                    See All Exhibitions
                    <i className="icomoon-arrowCircleRight align-middle icn ml-1">
                      <span className="sr-only">icon</span>
                    </i>
                  </a>
                </div>
              </div>
            </section>
            {/* aboutOnviewBlock */}
            <article className="aboutOnviewBlock hasBdr bg-grayf8f8f8 pt-6 pb-6 pt-md-10 pb-md-10 pt-lg-16 pb-lg-16 pt-xl-20 pb-xl-20">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-4">
                    {/* headHeading */}
                    <header className="headHeading">
                      <h2 className="h2Medium">Read About Our Institution</h2>
                    </header>
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="decrTextMedium fontSerif">
                      <p>
                        Founded in 1965 as an educational institution based in
                        london, The Art &amp; History Museum is committed to
                        producing distinctive exhibitions and public programming
                        on Asian art.
                      </p>
                    </div>
                    <hr className="my-4 my-lg-7" />
                    <h3 className="h3Small fontBase fwMedium mb-5">
                      On View at Museum
                    </h3>
                    {/* bulletList */}
                    <ul className="list-unstyled bulletList listHasColumns text-gray777 mb-0">
                      <li>Middle Eastern Art</li>
                      <li>Artifacts and Antiquities</li>
                      <li>Traditional Art</li>
                      <li>Western &amp; Non-Western cultures</li>
                      <li>Photography</li>
                      <li>Emerging Design</li>
                      <li>East Asian Art</li>
                      <li>War History</li>
                      <li>Latin American Art</li>
                      <li>Gardens</li>
                      <li>20th Century Design</li>
                      <li>Contemporary Design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
            {/* collectionsBlock */}
            <section className="collectionsBlock pt-6 pt-md-11 pt-lg-16 pt-xl-21 pb-6 pb-md-10 pb-lg-14 pb-xl-20">
              <div className="container">
                {/* topHeadingHead */}
                <header className="topHeadingHead text-center mb-7 mb-lg-11">
                  <strong className="tpHeadingTitle text-uppercase font-weight-normal d-block mb-2 mb-md-5">
                    Art works &amp; Objects
                  </strong>
                  <h1>Explore the Collection</h1>
                </header>
                {/* makeItMasonery */}
                <div className="row makeItMasonery">
                  <div className="mimItem col-12 col-sm-6 col-md-4">
                    {/* collectionColumn */}
                    <article className="collectionColumn mb-6 mb-lg-11">
                      <div className="imgHolder mb-4">
                        <a href="single-works.html">
                          <img
                            src="http://placehold.it/365x290"
                            className="img-fluid w-100 d-block"
                            alt="image description"
                          />
                        </a>
                      </div>
                      <h2 className="mb-1">
                        <a href="single-works.html">
                          Daniel Henry Khanweiler autumn, 1930
                        </a>
                      </h2>
                      <h3 className="text-gray777 fontBase">Tankha Atska</h3>
                    </article>
                  </div>
                  <div className="mimItem col-12 col-sm-6 col-md-4">
                    {/* collectionColumn */}
                    <article className="collectionColumn mb-6 mb-lg-11">
                      <div className="imgHolder mb-4">
                        <a href="single-works.html">
                          <img
                            src="http://placehold.it/365x480"
                            className="img-fluid w-100 d-block"
                            alt="image description"
                          />
                        </a>
                      </div>
                      <h2 className="mb-1">
                        <a href="single-works.html">Germanian Grothery, 1986</a>
                      </h2>
                      <h3 className="text-gray777 fontBase">Henry Merparlo</h3>
                    </article>
                  </div>
                  <div className="mimItem col-12 col-sm-6 col-md-4">
                    {/* collectionColumn */}
                    <article className="collectionColumn mb-6 mb-lg-11">
                      <div className="imgHolder mb-4">
                        <a href="single-works.html">
                          <img
                            src="http://placehold.it/365x330"
                            className="img-fluid w-100 d-block"
                            alt="image description"
                          />
                        </a>
                      </div>
                      <h2 className="mb-1">
                        <a href="single-works.html">
                          The Yellow House (The Street Night), 1888
                        </a>
                      </h2>
                      <h3 className="text-gray777 fontBase">Linda M. Dugan</h3>
                    </article>
                  </div>
                  <div className="mimItem col-12 col-sm-6 col-md-4">
                    {/* collectionColumn */}
                    <article className="collectionColumn mb-6 mb-lg-11">
                      <div className="imgHolder mb-4">
                        <a href="single-works.html">
                          <img
                            src="http://placehold.it/365x530"
                            className="img-fluid w-100 d-block"
                            alt="image description"
                          />
                        </a>
                      </div>
                      <h2 className="mb-1">
                        <a href="single-works.html">
                          Landscape with a Stack of Peat and Farm houses, 1852
                        </a>
                      </h2>
                      <h3 className="text-gray777 fontBase">Linda M. Dugan</h3>
                    </article>
                  </div>
                  <div className="mimItem col-12 col-sm-6 col-md-4">
                    {/* collectionColumn */}
                    <article className="collectionColumn mb-6 mb-lg-11">
                      <div className="imgHolder mb-4">
                        <a href="single-works.html">
                          <img
                            src="http://placehold.it/365x490"
                            className="img-fluid w-100 d-block"
                            alt="image description"
                          />
                        </a>
                      </div>
                      <h2 className="mb-1">
                        <a href="single-works.html">
                          Daniel Henry Khanweiler autumn, 1930
                        </a>
                      </h2>
                      <h3 className="text-gray777 fontBase">Tommy Martinez</h3>
                    </article>
                  </div>
                  <div className="mimItem col-12 col-sm-6 col-md-4">
                    {/* collectionColumn */}
                    <article className="collectionColumn mb-6 mb-lg-11">
                      <div className="imgHolder mb-4">
                        <a href="single-works.html">
                          <img
                            src="http://placehold.it/365x340"
                            className="img-fluid w-100 d-block"
                            alt="image description"
                          />
                        </a>
                      </div>
                      <h2 className="mb-1">
                        <a href="single-works.html">Germanian Grothery, 1986</a>
                      </h2>
                      <h3 className="text-gray777 fontBase">
                        Claude K. Amadeo
                      </h3>
                    </article>
                  </div>
                </div>
                {/* btnWrap */}
                <footer className="btnWrap text-center">
                  <a
                    href="single-works.html"
                    className="btn btnGre5 btnGre5Outline bdr2 btnLgMinWidth"
                  >
                    Explore All Collections
                  </a>
                </footer>
              </div>
            </section>
            {/* supportUsBlock */}
            <section className="supportUsBlock hasBdr bg-grayf8f8f8 pt-6 pb-1 pt-md-11 pb-md-5 pt-lg-16 pb-lg-10 pt-xl-22 pb-xl-16">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-4">
                    {/* subFeatureColumn */}
                    <article className="subFeatureColumn text-center mb-6 px-xl-6">
                      <span className="icnWrap animItVi d-flex align-items-center mb-3 mb-lg-7">
                        <span className="d-block w-100">
                          <img
                            src="images/icn04.svg"
                            width={78}
                            height={85}
                            className="img-fluid"
                            alt="icon"
                          />
                        </span>
                      </span>
                      <h2 className="mb-2 mb-lg-4">Learn</h2>
                      <p className="mb-4 mb-lg-7">
                        Various type of internship programs available for
                        students.
                      </p>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-outline-dark align-top btnMdMinWidth bdr2"
                      >
                        Internship
                      </a>
                    </article>
                  </div>
                  <div className="col-12 col-md-4">
                    {/* subFeatureColumn */}
                    <article className="subFeatureColumn text-center mb-6 px-xl-6">
                      <span className="icnWrap animItVi d-flex align-items-center mb-3 mb-lg-7">
                        <span className="d-block w-100">
                          <img
                            src="images/icn05.svg"
                            width={74}
                            height={78}
                            className="img-fluid"
                            alt="icon"
                          />
                        </span>
                      </span>
                      <h2 className="mb-2 mb-lg-4">Donate</h2>
                      <p className="mb-4 mb-lg-7">
                        Our Memberships provide wonderful benefits and supports.
                      </p>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-outline-dark align-top btnMdMinWidth bdr2"
                      >
                        Make a Gift
                      </a>
                    </article>
                  </div>
                  <div className="col-12 col-md-4">
                    {/* subFeatureColumn */}
                    <article className="subFeatureColumn text-center mb-6 px-xl-6">
                      <span className="icnWrap animItVi d-flex align-items-center mb-3 mb-lg-7">
                        <span className="d-block w-100">
                          <img
                            src="images/icn06.svg"
                            width={78}
                            height={75}
                            className="img-fluid"
                            alt="icon"
                          />
                        </span>
                      </span>
                      <h2 className="mb-2 mb-lg-4">Experience</h2>
                      <p className="mb-4 mb-lg-7">
                        The ideal year-round location to host your wedding or
                        special event.
                      </p>
                      <a
                        href="javascript:void(0);"
                        className="btn btn-outline-dark align-top btnMdMinWidth bdr2"
                      >
                        Host Event
                      </a>
                    </article>
                  </div>
                </div>
              </div>
            </section>
            {/* sponsorsAside */}
            <aside className="sponsorsAside bg-secondary text-white pt-5 pb-5 pt-md-8 pb-md-8 pt-lg-13 pb-lg-13 pt-xl-20 pb-xl-19">
              <div className="container">
                {/* topHeadingHead */}
                <header className="topHeadingHead mb-6 mb-md-9 mb-lg-14">
                  <strong className="tpHeadingTitle text-uppercase font-weight-normal d-block mb-3">
                    Part of the Museum
                  </strong>
                  <h2 className="h2Medium text-white">
                    Our Partners &amp; Sponsers
                  </h2>
                </header>
                {/* logosSlider */}
                <div className="logosSlider text-center">
                  <div>
                    {/* spLogoWrap */}
                    <div className="spLogoWrap w-100 d-flex align-items-center">
                      <span className="d-block w-100 px-3">
                        <img
                          src="http://placehold.it/150x100"
                          className="img-fluid"
                          alt="greateVillage"
                        />
                      </span>
                    </div>
                  </div>
                  <div>
                    {/* spLogoWrap */}
                    <div className="spLogoWrap w-100 d-flex align-items-center">
                      <span className="d-block w-100 px-3">
                        <img
                          src="http://placehold.it/150x100"
                          className="img-fluid"
                          alt="dilly"
                        />
                      </span>
                    </div>
                  </div>
                  <div>
                    {/* spLogoWrap */}
                    <div className="spLogoWrap w-100 d-flex align-items-center">
                      <span className="d-block w-100 px-3">
                        <img
                          src="http://placehold.it/150x100"
                          className="img-fluid"
                          alt="walkers"
                        />
                      </span>
                    </div>
                  </div>
                  <div>
                    {/* spLogoWrap */}
                    <div className="spLogoWrap w-100 d-flex align-items-center">
                      <span className="d-block w-100 px-3">
                        <img
                          src="http://placehold.it/150x100"
                          className="img-fluid"
                          alt="hispster"
                        />
                      </span>
                    </div>
                  </div>
                  <div>
                    {/* spLogoWrap */}
                    <div className="spLogoWrap w-100 d-flex align-items-center">
                      <span className="d-block w-100 px-3">
                        <img
                          src="http://placehold.it/150x100"
                          className="img-fluid"
                          alt="amelie"
                        />
                      </span>
                    </div>
                  </div>
                  <div>
                    {/* spLogoWrap */}
                    <div className="spLogoWrap w-100 d-flex align-items-center">
                      <span className="d-block w-100 px-3">
                        <img
                          src="http://placehold.it/150x100"
                          className="img-fluid"
                          alt="walkers"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
            {/* saMap */}
            <aside className="saMap w-100 position-relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3117.259425640003!2d-90.29593598438974!3d38.61991257085702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b57b271310d3%3A0x53ff7568884d5d00!2sKnox%20Industrial%20Dr%2C%20St.%20Louis%2C%20MO%2063139%2C%20USA!5e0!3m2!1sen!2s!4v1587836825553!5m2!1sen!2s"
                className="w-100 h-100 d-block border-0 position-absolute"
                aria-hidden="false"
                tabIndex={0}
              />
            </aside>
            {/* newsletterAside */}
            <aside className="newsletterAside text-center pt-6 pb-6 pt-md-8 pb-md-8 pt-lg-13 pb-lg-13 pt-xl-21 pb-xl-20">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                    {/* topHeadingHead */}
                    <header className="topHeadingHead mb-5 mb-md-10">
                      <strong className="tpHeadingTitle text-uppercase font-weight-normal d-block mb-3 mb-md-6">
                        Stay in Touch
                      </strong>
                      <h2>
                        Join our email list and be the first to know about
                        special events and more!
                      </h2>
                    </header>
                  </div>
                </div>
                <form action="#">
                  <div className="form-row justify-content-center mx-n2">
                    <div className="form-group px-2 mb-2">
                      <input
                        type="text"
                        className="form-control d-block"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="form-group px-2 mb-2">
                      <input
                        type="email"
                        className="form-control d-block"
                        placeholder="Your Email Address"
                      />
                    </div>
                    <div className="form-group px-2 mb-2">
                      <input
                        type="submit"
                        className="btn btn-secondary text-uppercase"
                        defaultValue="sign up!"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </aside>
          </main>
          {/* ftAreaWrap */}
          <div className="ftAreaWrap bg-secondary text-gray888">
            {/* footerAside */}
            <aside className="footerAside pt-6 pb-md-3 pt-md-7 pb-lg-5 pt-lg-10 pt-xl-15 pb-xl-13 text-center text-md-left">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-md-3 mb-6">
                    {/* ftLogo */}
                    <div className="ftLogo mt-1 mx-auto mx-md-0">
                      <a href="javascript:void(0);">
                        <img
                          src="images/logo-dark.png"
                          className="img-fluid"
                          alt="Muzze || Art & History Museum"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-12 col-md-3 mb-6">
                    <h3 className="text-white mb-4">Address</h3>
                    {/* ftAdr */}
                    <address className="ftAdr mb-2 mb-md-5">
                      2270 S Real Camino Lake California, US 90967
                    </address>
                    <a
                      href="javascript:void(0);"
                      className="ftPinLink text-uppercase"
                    >
                      <i className="fas fa-map-marker-alt icn">
                        <span className="sr-only">icon</span>
                      </i>
                      Geting Here
                    </a>
                  </div>
                  <div className="col-12 col-md-3 mb-6">
                    <h3 className="text-white mb-4">Hours</h3>
                    <time dateTime="2011-01-12" className="d-block mb-3">
                      Daily 9.30 am–6.00 pm
                    </time>
                    <strong className="font-weight-normal d-block svTitle">
                      Café Service
                    </strong>
                    <time dateTime="2011-01-12" className="d-block">
                      Daily 10.00 am–7.00 pm
                    </time>
                  </div>
                  <div className="col-12 col-md-3 mb-6">
                    <h3 className="text-white mb-4">Contact Us</h3>
                    {/* ftContactList */}
                    <ul className="list-unstyled ftContactList mb-0 mb-md-3">
                      <li>
                        <a href="tel:16179876543">1 (617) 987-6543</a>
                      </li>
                      <li>
                        <a href="mailto:info@museumwp.com">info@museumwp.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
            {/* pageFooter */}
            <footer
              id="pageFooter"
              className="bg-dark text-gray777 text-center pt-6 pb-3 pt-lg-11 pb-lg-9"
            >
              <div className="container">
                {/* ftSocialNetworks */}
                <ul className="list-unstyled socialNetworks ftSocialNetworks d-flex flex-wrap justify-content-center mb-4">
                  <li>
                    <a href="javascript:void(0);">
                      <i className="fab fa-twitter">
                        <span className="sr-only">twitter</span>
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <i className="fab fa-pinterest">
                        <span className="sr-only">pinterest</span>
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <i className="fab fa-facebook-f">
                        <span className="sr-only">facebook</span>
                      </i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <i className="fab fa-instagram">
                        <span className="sr-only">instagram</span>
                      </i>
                    </a>
                  </li>
                </ul>
                <p className="mb-2">
                  Museum Template - <a href="home.html">Mad UX</a> © 2020. All
                  Rights Reserved
                </p>
                {/* ftTermLinks */}
                <ul className="list-unstyled ftTermLinks d-flex flex-wrap justify-content-center">
                  <li>
                    <a href="javascript:void(0);">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">Terms of Use</a>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
          <div
            className="modal fade"
            id="exampleModalLong"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-lg orderTicketModal"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header bg-brown py-3 px-lg-5">
                  <h3 className="text-white mb-0">Order Ticket Online</h3>
                </div>
                <div className="modal-body px-lg-6 pt-lg-6">
                  <form action="#">
                    <div className="form-group position-relative mb-5">
                      <label className="d-flex align-items-center">
                        <strong className="font-weight-normal d-block flex-shrink-0 mr-4 text-gray777 sdLabelTitle">
                          Select Date
                        </strong>
                        <input
                          type="date"
                          className="form-control d-block mxInput"
                        />
                      </label>
                    </div>
                    <div className="form-group position-relative mb-5">
                      <label className="d-flex align-items-center">
                        <strong className="font-weight-normal d-block flex-shrink-0 mr-4 text-gray777 sdLabelTitle">
                          Select Time
                        </strong>
                        <input
                          type="time"
                          className="form-control d-block mxInput"
                        />
                      </label>
                    </div>
                    <h4 className="fontBase mt-7">Choose your Ticket</h4>
                    <div className="ttTableWrap">
                      <table className="w-100 ticketTable text-gray777">
                        <thead>
                          <tr>
                            <th>Ticket Type</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Adult</td>
                            <td>25</td>
                            <td>
                              <div className="quantity">
                                <div className="quantity quantityII position-relative d-inline-block mt-1">
                                  <input
                                    type="number"
                                    min={1}
                                    defaultValue={2}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>$50</td>
                          </tr>
                          <tr>
                            <td>
                              Senior{" "}
                              <span className="text-gray">(age above 55)</span>
                            </td>
                            <td>20</td>
                            <td>
                              <div className="quantity">
                                <div className="quantity quantityII position-relative d-inline-block mt-1">
                                  <input
                                    type="number"
                                    min={1}
                                    defaultValue={0}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                          <tr>
                            <td>
                              Student
                              <span className="text-gray">
                                (University/ College)
                              </span>
                            </td>
                            <td>15</td>
                            <td>
                              <div className="quantity">
                                <div className="quantity quantityII position-relative d-inline-block mt-1">
                                  <input
                                    type="number"
                                    min={1}
                                    defaultValue={1}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>$15</td>
                          </tr>
                          <tr>
                            <td>
                              Child
                              <span className="text-gray">
                                (age 13 and under)
                              </span>
                            </td>
                            <td>Free</td>
                            <td>
                              <div className="quantity">
                                <div className="quantity quantityII position-relative d-inline-block mt-1">
                                  <input
                                    type="number"
                                    min={1}
                                    defaultValue={0}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>&nbsp;</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={3}>Total Price</td>
                            <td>$65</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <h4 className="fontBase mt-2 mb-5">Your Information</h4>
                    <div className="form-row mx-n2">
                      <div className="px-2 col-12 col-sm-6">
                        <div className="form-group position-relative mb-4">
                          <input
                            type="text"
                            className="form-control w-100 d-block"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div className="px-2 col-12 col-sm-6">
                        <div className="form-group position-relative mb-4">
                          <input
                            type="text"
                            className="form-control w-100 d-block"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className="px-2 col-12 col-sm-6">
                        <div className="form-group position-relative mb-4">
                          <input
                            type="tel"
                            className="form-control w-100 d-block"
                            placeholder="Phone Number"
                          />
                        </div>
                      </div>
                      <div className="px-2 col-12 col-sm-6">
                        <div className="form-group position-relative mb-4">
                          <input
                            type="email"
                            className="form-control w-100 d-block"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                      <div className="px-2 col-12">
                        <div className="form-group position-relative mb-4">
                          <input
                            type="text"
                            className="form-control w-100 d-block"
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="px-2 col-12">
                        <div className="form-group position-relative mb-4">
                          <textarea
                            className="form-control d-block w-100"
                            placeholder="Additional Details "
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-secondary fontBase text-uppercase d-block w-100 mb-5"
                      defaultValue="Confirm Booking"
                    />
                    <div className="text-center">
                      <p>
                        Please checkout your cart and payment for the ticket.
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* include jQuery library */}
        {/* include bootstrap popper JavaScript */}
        {/* include bootstrap JavaScript */}
        {/* include custom JavaScript */}
        {/* include fontawesome kit */}
      </>
    </div>
  );
};

export default Test;
