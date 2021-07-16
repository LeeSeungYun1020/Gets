import React from "react";
import {Box, Select} from "grommet";
import {CaretDownFill} from "grommet-icons";
import select_nav from "../images/home/select_nav.webp"
function HomeStyleSelectBox(props) {
    const [value, setValue] = React.useState(props.default);
    return (
        <div id = "style_info_box">
            <div>
                <h3>{props.title}</h3>
                <Select
                    id = "info_select"
                    options={props.list}
                    value={value}
                    onChange={({ option }) => setValue(option)}
                    style={{
                        width: '7vw',
                    }}
                    icon={
                        <Box>
                            <CaretDownFill size="large" color="#d4d3d3" />
                        </Box>
                    }
                />
            </div>
            <div id={`info_${props.index}`}></div>
        </div>
    );
}

export default HomeStyleSelectBox