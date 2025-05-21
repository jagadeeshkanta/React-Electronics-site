import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <>
    <div className="container2 mt-5">
        <div className="first">
            <div className="title mb-3">
                <img src="/bag.png" alt="bag" className='bag' />
                <span>Mart</span>
            </div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing eh5t. Provident quasi dicta 
            nobis quas soluta natus cum nostrum tempore, eum nam laborum eveniet distinctio
            voluptatem ut qui maiores quia, h5bero voluptas?</p>
        </div>
        <div className="second">
            <h3 className='mb-3'>About Us</h3>
                <h5>Careers</h5>
                <h5>Our Stores</h5>
                <h5>Our Cares</h5>
                <h5>Terms & Conditions</h5>
                <h5>Privacy & Poh5cy</h5>
        </div>
        <div className="Third">
            <h3 className='mb-3'>Customer Care</h3>
                <h5>Help center</h5>
                <h5>How to buy</h5>
                <h5>Track your Order</h5>
                <h5>Corporate & Bulk Purchasing</h5>
                <h5>Returns & Refunds</h5>
        </div>
        <div className="Fourth">
            <h3 className='mb-3'>Contact Us</h3>
                <h5>70 Washington Square South, New York, NY 10012, United States</h5>
                <h5>Email: example@gmail.com</h5>
                <h5>Phone: +91 0330020100</h5>
        </div>
    </div>
    </>
  )
}

export default Footer
