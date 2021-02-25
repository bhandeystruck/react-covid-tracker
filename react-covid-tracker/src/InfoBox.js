import { Card } from '@material-ui/core'
import React from 'react'
import { CardContent, Typography} from "@material-ui/core";

function InfoBox({title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                {/* Number of cases */}
                <h2 className="infoBox__cases">{cases}</h2>


                 {/* Total cases */}
                 <Typography className="infoBox__total" color="textSecondary">
                     {total}
                 </Typography>

            </CardContent>
        </Card>
       
    )
}

export default InfoBox
