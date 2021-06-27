import React, { useState, useRef } from 'react';





import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader'
import LanguageIcon from '@material-ui/icons/Language';
import SquareFootSharpIcon from '@material-ui/icons/SquareFootSharp';
import TextFieldsSharpIcon from '@material-ui/icons/TextFieldsSharp';
import BubbleChartSharpIcon from '@material-ui/icons/BubbleChartSharp';
import CommentSharpIcon from '@material-ui/icons/CommentSharp';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import { makeStyles } from '@material-ui/core/styles';



import Accordian from '@material-ui/core/Accordion';
import AccordianSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';






const fakeRegions = [
    {
        name: 'Indonesia',
        subRegions: ['Sumba', 'Sumba2', 'Sumba3']
    },
    {
        name: 'Nigeria',
        subRegions: ['Sumba', 'Sumba2', 'Sumba3']
    },
    {
        name: 'Benin',
        subRegions: ['Sumba', 'Sumba2', 'Sumba3']
    },
    {
        name: 'Kenya',
        subRegions: ['Sumba', 'Sumba2', 'Sumba3']
    }            
];


// TODO: put in own componenet -- TYPOGRAPHCY?
function ExpandableItem({title, icon, children}) {
    return (
        <Accordian
            style={{ marginBottom: '0px', marginTop: '0px', borderTop: '1px solid grey', borderBottom: '1px solid grey'}}
        >
            <AccordianSummary
                expandIcon={ <ExpandMore /> }  
            >
                {icon}
                <Typography style={{marginLeft: '10px'}}>
                    {title}
                </Typography>
            </AccordianSummary>
            <AccordionDetails style={{ padding: 0 }}>
                { children }
            </AccordionDetails>
        </Accordian>   
    );
}

const StyledListItem = styled(ListItem)`
    textAlign: 'right';
    background: ${props => props.selected ? 'rgba(255,255,255,0.1)' : 'none'};
`;

function RegionSelector({regions, setSubRegion, setShowSide}) {

    const [selected, setSelected] = useState(null);    

	return (

		<div style={{ height: '100vh', overflowY: 'hidden'}}>
            <List
                // subheader={<ListSubheader>test</ListSubheader>}
                style={{ paddingTop: 0}}
            >
                <Divider />

                

                    {regions.map((d) => (                        
                        <ExpandableItem
                            key={d.name}
                            title={d.name}
                            icon={ <LanguageIcon /> }                            
                        >
                            
                            <List style={{ paddingTop: 0, paddingBottom: 0, width: '100%'}}>
                            {d.subRegions.map((subregion) => (
                                <>
                                <Divider></Divider>    
                                <StyledListItem 
                                    key={subregion.name}
                                    button
                                    selected={selected === subregion.name}
                                    // style={{ 
                                    //     textAlign: 'right',
                                    //     backgroundColor: selected === subregion.name ? 'rgba(255,255,255,0.1)' : 'none'
                                    // }}
                                    onClick={() => {
                                        setSubRegion(subregion);
                                        setSelected(subregion.name);
                                        setShowSide('right');
                                    }}
                                >
                                    <ListItemText primary={subregion.name}/>
                                </StyledListItem>                                
                                </>

                                
                            ))}
                            <Divider></Divider>    
                            </List>
                        </ExpandableItem>
                    ))}


            </List>						
		</div>
		
	);

}

export default RegionSelector;