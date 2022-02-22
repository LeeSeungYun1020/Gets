import HomeRecommendItem from "./HomeRecommendItem";
import React, {useState} from "react";

const HomeRecommend = (props) => {
    const [selected, SetSelected] = useState([]);
    let isSelected = []
    let sum = 0;

    for (let item of props.chips) {
        isSelected[item.text] = item.selected
    }
    if ((props.style & 1) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "Minimal") {
                props.chips[i].selected = true;
            }
        }
    }
    if ((props.style & 2) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "Casual") {
                props.chips[i].selected = true;
            }
        }
    }
    if ((props.style & 4) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "Campus") {
                props.chips[i].selected = true;
            }
        }
    }
    if ((props.style & 8) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "Street") {
                props.chips[i].selected = true;
            }
        }
    }
    if ((props.style & 16) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "Rock chic") {
                props.chips[i].selected = true;
            }
        }
    }
    if ((props.style & 32) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "Amekaji") {
                props.chips[i].selected = true;
            }
        }
    }
    if ((props.style & 64) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "City boy") {
                props.chips[i].selected = true;
            }
        }
    }
    if ((props.style & 128) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "Office") {
                props.chips[i].selected = true;
            }
        }
    }
    if ((props.style & 256) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "Sexy glam") {
                props.chips[i].selected = true;
            }
        }
    }
    if ((props.style & 512) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "Feminine") {
                props.chips[i].selected = true;
            }
        }
    }
    if ((props.style & 1024) !== 0) {
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === "Lovely") {
                props.chips[i].selected = true;
            }
        }
    }
    const styleClick = (key) => {
        sum = 0;
        let isSelected = []
        for (let i = 0; i < props.chips.length; i++) {
            if (props.chips[i].text === key) {
                props.chips[i].selected = !props.chips[i].selected
            }
            isSelected[props.chips[i].text] = props.chips[i].selected // true or false인지 적음
        }
        SetSelected(isSelected)
        // styleSelectCheck(selected)
        for (let i = 0; i < props.chips.length; i++) {
            if (isSelected[props.chips[i].text] === true) {
                if (props.chips[i].text === "Minimal") {
                    // props.SetStyle(sum + 1);
                    sum += 1;
                } else if (props.chips[i].text === "Casual") {
                    sum += 2;
                } else if (props.chips[i].text === "Campus") {
                    sum += 4;
                } else if (props.chips[i].text === "Street") {
                    sum += 8;
                } else if (props.chips[i].text === "Rock chic") {
                    sum += 16;
                } else if (props.chips[i].text === "Amekaji") {
                    sum += 32;
                } else if (props.chips[i].text === "City boy") {
                    sum += 64;

                } else if (props.chips[i].text === "Office") {
                    sum += 128;
                } else if (props.chips[i].text === "Sexy glam") {
                    sum += 256;
                } else if (props.chips[i].text === "Feminine") {
                    sum += 512;
                } else if (props.chips[i].text === "Lovely") {
                    sum += 1024;
                }
                props.SetStyle(sum);
            }
        }
    }
    const chips = props.chips.map((item) =>
        <div key={item.text} onClick={() => {
            styleClick(item.text)
        }}>
            <HomeRecommendItem image={item.image} text={item.text} selected={item.selected}/>
        </div>)
    return (
        <div id="recommend">
            <h1>{props.title}</h1>
            <div className="style">
                {chips}
            </div>
        </div>
    )
}

export default HomeRecommend