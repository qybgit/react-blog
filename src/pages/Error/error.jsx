import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
function Error() {
  return (
    <>
      <div style={{ padding: 20 }}>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="primary" style={{ backgroundColor: '#333' }}>
              <Link to="/index">返回</Link>
            </Button>
          }
        />{' '}
      </div>
    </>
  )
}
export default Error
