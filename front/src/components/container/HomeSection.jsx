import ActualDate from "../pure/ActualDate";
import SearchBar from "../pure/SearchBar";

export default function HomeSection() {
  return (
    <div className='grid justify-items-center'>
        <div><ActualDate /><SearchBar/></div>
        <div></div>
        <div></div>
    </div>
  )
}
