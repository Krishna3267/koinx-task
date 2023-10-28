import faqs from "../data/faqs";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
const FaqSection = () => {

    return(
        <Box className={"faq-section"} sx={{flexGrow:10}}>
            <h2>Frequently Asked Questions</h2>
            <ol>
                {
                    faqs.map((element , index) => 
                    
                    (
                      <li key={index+1}>
                        <p className="question">{element.question}</p>
                        <p className="answer">{element.answer}</p>
                        <Divider/>
                      </li>
                      )  
                    )
                }
            </ol>
        </Box>
    )

}

export default FaqSection;