import emailjs from "emailjs-com";
import React from 'react';

export default function ContactUs() {

    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm('service_0sqylhm', 'template_qzxu8l7', e.target, 'user_fSbAhXXk7R3OFpNqdV4HO')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

    return(
        
           

            
            <div className="container">
                <div className=" ">

                <form onSubmit={sendEmail}>
                <br></br>
            <h2 className="center text-primary font24">Liên hệ email hỗ trợ</h2>
                    <div className="form-group">
                        
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Tên" name="name"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Địa chỉ email" name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Chủ đề" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Nội dung tin nhắn" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto right">
                            <input type="submit" className="btn btn-info " value="Gửi"></input>
                        </div>
                    </div>
                </form>
                </div>
                
            
            </div>

          
        
    )
}