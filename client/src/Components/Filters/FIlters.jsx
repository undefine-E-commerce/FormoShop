import { useId } from 'react'
import { useFilters } from '../../hooks/useFilters.js'
import './Filters.css'

export function Filters () {
  const { filters, setFilters } = useFilters()

  const minPriceFilterId = useId()


  const handleChangeMinPrice = (event) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }



  return (
    <div className='filters'>
      <div>
        <label className='text-white' htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          className='form-range'
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>
    </div>

  )
}