import React from "react";

export default ({ close }) => (
  <div className="modal">
    <a className="close" onClick={close}>
      &times;
    </a>
    <div className="content">
    <section className="popup">
           <div className="content">
            <h2>kem1</h2>
               <div className="plot">
                   <img src="https://www.saveur.com/resizer/sq-17z6mrjFQ0T0mDm-_OBNaEWU=/760x950/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/6U5RCBTPHKMZNVG5L3FKKSCIOU.jpg" /> 
                   
                   
              </div> 
              <p><strong>Taste: Orange</strong></p>   
              <p><strong>Color: Yellow</strong></p>
              <a className="close" onClick={close}>
                &times;
               </a>
            </div>
        </section>
    </div>
  </div>
);
// import { SelectOutlined } from '@ant-design/icons';
// import React from 'react';

// function Popup({ selected, closePopup}){
//     return (
//         <section className="popup">
//             <div className="content">
//                 <h2>{selected.name} <span>({selected.Taste})</span></h2>
//                 <p className="name"></p>
//                 <div className="plot">
//                     <img src={selected.image} /> 
//                 </div>
//                 <button className="close"></button>
//             </div>
//         </section>
//     )
// }

// export default Popup