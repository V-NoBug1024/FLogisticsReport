import * as React from "react";
import * as qs from 'query-string';
import * as styles from "./index.scss";
import Card from '@components/Card';
import GroupsTag from '@components/GroupsTag';


import { getFLogisticsReport } from '../../services'

const {useState,useEffect} = React

export default React.memo(()=>{

  const [ FLogisticsReportInfo, setFLogisticsReportInfo ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    const params = qs.parse(window.location.search);

    const {msgid} = params;
    getFLogisticsReport(msgid).then(((res:any)=>{
      const {title,fLogisticsReportGroupList} = res;
      setFLogisticsReportInfo(fLogisticsReportGroupList)
      document.title =title
    })).catch(setError)
  }, [])

  return (
    <>
      {error ? <div>页面出错，重新刷新试试</div>: <>
          {FLogisticsReportInfo && FLogisticsReportInfo.map((item: { groupName: string;fLogisticsReportDetailList:[] })=>{
            return (
              <React.Fragment key={item.groupName}>
                <GroupsTag name={item.groupName}/>
                <Card fLogisticsReportDetailList={item.fLogisticsReportDetailList}/>
              </React.Fragment>
            )
          })}
          
        </>
      }
      
    </>
  )
})