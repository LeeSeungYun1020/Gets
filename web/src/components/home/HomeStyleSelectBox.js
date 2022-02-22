import React, {useEffect, useState} from "react";
import {Box, Select} from "grommet";
import {CaretDownFill} from "grommet-icons";

const HomeStyleSelectBox = (props) => {
    const [value, setValue] = useState(props.default);
    useEffect(() => {
        props.setType(value)
    }, [value])
    return (
        <div id="style_info_box">
            <div>
                <h3>{props.title}</h3>
                <Select
                    id="info_select"
                    options={props.list}
                    value={value}
                    onChange={({option}) => setValue(option)}
                    style={{
                        width: '7vw',
                    }}
                    icon={
                        <Box>
                            <CaretDownFill size="medium" color="#000000"/>
                        </Box>
                    }
                />
            </div>
            <div id={`info_${props.index}`}></div>
        </div>
    );
}

export default HomeStyleSelectBox