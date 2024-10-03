import React, { useEffect, useRef, useState } from 'react'
import right from './image/right.svg';
import left from './image/left.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const [data, usedata] = useState([]);

  const nevigate = useNavigate();

  const [search, setSearch] = useState('');

  const LogOut = () =>{
    nevigate('/');
  }

  useEffect(() => {
    fetch('http://localhost:3006/fooddata').then(resp => resp.json()).then(json => { console.log(json); usedata(json) })
  }, []);

  const Prevref = useRef(null);

  const items = [
    {
      id: 1,
      name: "Pizza",
      image: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg"
    },
    {
      id: 2,
      name: "Burger",
      image: "https://mrbrownbakery.com/image/images/rEyMLsj21Ooxk5mfhdeh7bSevaLGzUtczWXVDj4u.jpeg?p=full"
    }, {
      id: 3,
      name: "Chinese",
      image: "https://ik.imagekit.io/awwybhhmo/satellite_images/chinese/gray/about_us/2.jpg?tr=w-3840"
    }, {
      id: 4,
      name: "Biryani",
      image: "https://www.thespruceeats.com/thmb/XDBL9gA6A6nYWUdsRZ3QwH084rk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-chicken-biryani-recipe-7367850-hero-A-ed211926bb0e4ca1be510695c15ce111.jpg"
    }, {
      id: 5,
      name: "Dosa",
      image: "https://i.ytimg.com/vi/CCab5oh0ZOc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA730YKb2VkyJ2V4Q-R9cICWRXs9w"
    }, {
      id: 6,
      name: "Samosa",
      image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/08/Best-Indian-Punjabi-Samosa-Recipe.jpg"
    }, {
      id: 7,
      name: "Rolls",
      image: "https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe.jpg"
    }, {
      id: 8,
      name: "Bread",
      image: "https://fullofplants.com/wp-content/uploads/2023/05/Homemade-Naan-Bread-Restaurant-Style-Vegan-thumb-1-500x500.jpg"
    }
  ]

  return (
    <div>
      {/* Header */}

      <div className='headers'>
        <div className='container'>
          <img className='ms-4 mt-4 mb-5' src='https://product-assets.faasos.io/eatsure_cms/production/333b405b-13b6-429f-82db-900e9795da54.png' alt='logo' height={'75px'} width={'auto'} />
          <button className='btn btn-primary float-end mt-5' onClick={LogOut}>Log Out</button>
          <form>
            <div className='row'>
              <div className='col-lg-8 mx-auto'>
                <input value={search} onChange={(e) => { setSearch(e.target.value) }} className='form-control' placeholder='Enter your Fev Food !...' />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Carousel section */}

      <div className='carousel mt-5'>
        <button className='' style={{ border: "none", position: "absolute", top: "125px", left: "75px", backgroundColor: "none" }} onClick={() => {
          Prevref.current.scrollBy({
            left: -200,
            behavior: "smooth",
          })
        }}>
          <img src={left} />
        </button>
        <div className='container' >
          <div ref={Prevref} style={{ display: "flex", overflow: "hidden", alignItems: "center" }}>
            {
              items.map((x) => (
                <div key={x.id}>
                  <div className='card me-3' style={{ width: "18rem" }}>
                    <img className='card-img-top' src={x.image} alt='food-image' width="225px" height="275px" />
                    <p className='text-center fw-bold text-dark bg-light p-2 rounded-pill' style={{ position: "absolute", top: "225px", left: "125px" }}>{x.name}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <button style={{ border: "none", position: "absolute", top: "125px", left: "1265px", backgroundColor: "none" }} onClick={() => {
          Prevref.current.scrollBy({
            left: 200,
            behavior: "smooth",
          })
        }}>
          <img src={right} />
        </button>
      </div>
      <br />
      <hr />

      {/* Resturent data */}

      <h1 className='ms-5 mt-5'>Welcome to our site !.Find your Food</h1>
      <div className='container mt-3'>
        <Row>
          {
            data.filter((x) => {
              if (search === '') {
                return true;
              } else {
                return search.toLowerCase() === '' ? data : x.title.toLowerCase().includes(search);
              }
            }).map((x) => (
              <Col>
                <div key={x.id}>
                  <div className='card m-3' style={{ width: "15rem" }}>
                    <img className='card-img-top' src={x.images} width="124px" height="185px" />
                    <div className='card-body'>
                      <h3>{x.title}</h3>
                      <p>Ratings :{x.ratings}</p>
                      <p>Area : {x.area}</p>
                      <p>Time : {x.time}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  )
}

export default Dashboard