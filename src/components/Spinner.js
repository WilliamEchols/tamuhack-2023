
import { ThreeDots } from  'react-loader-spinner'

export default () => {
    return (
        <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="lightgrey" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        />
  )
}