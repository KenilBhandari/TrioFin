import React from 'react'

function Cards(props) {
  return (
    <div
            className={props.position}
            style={{ fontFamily: "Work Sans" }}
          >
            <span>{props.year}</span>

            <div className="w-fit h-fit">
              <img
                className="h-[66px] w-[66px]  mt-[-10px] ml-[3px]"
                src="https://tinyurl.com/ymfcdy9t"
                alt="Car"
              />

              <span className="absolute top-[55px] left-[121px] text-[20px] text-[#000000]">
                :
              </span>
              <img
                className="h-[30px] w-[30px]  mt-[-50px] ml-[100px]"
                src="https://tinyurl.com/yhwm4aj6"
                alt="Lock"
              />
            </div>

            <div className="absolute left-[253px] top-[55px] w-fit h-fit">
              <img
                className="h-[47px] w-[40px]  mt-[-10px] ml-[3px]"
                src="https://tinyurl.com/37mebf22 "
                alt="Home"
              />

              <span className="absolute top-[0px] left-[55px] text-[20px] text-[#000000]">
                :
              </span>
              <img
                className="h-[30px] w-[30px]  mt-[-37px] ml-[70px]"
                src="https://tinyurl.com/yhwm4aj6"
                alt="Lock"
              />
            </div>

            <div className="w-fit h-fit">
              <img
                className="h-[50px] w-[50px]  mt-[10px] ml-[10px]"
                src="https://tinyurl.com/mwyebmx4"
                alt="World"
              />

              <span className="absolute top-[103px] left-[121px] text-[20px] text-[#000000]">
                :
              </span>

              <img
                className="h-[30px] w-[30px]  mt-[-40px] ml-[100px]"
                src="https://tinyurl.com/yhwm4aj6"
                alt="Lock"
              />
            </div>

            <div className="absolute left-[253px] top-[105px] w-fit h-fit">
              <img
                className="h-[47px] w-[40px]  mt-[-10px] ml-[3px]"
                src="https://tinyurl.com/4trz84yy"
                alt="Real Estate"
              />

              <span className="absolute top-[0px] left-[55px] text-[20px] text-[#000000]">
                :
              </span>
              <img
                className="h-[30px] w-[30px]  mt-[-37px] ml-[70px]"
                src="https://tinyurl.com/yhwm4aj6"
                alt="Lock"
              />
            </div>
          </div>

  )
}

export default Cards