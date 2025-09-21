import React from 'react'

const GenderCheckBox = ({handleGenderChange, selectedGender}) => {
  return (
    <>
        <div className='flex'>

            <div className='form-control'>
                <label className={'label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}'}>
                    <span className='label-text'>Male</span>
                    <input type='checkbox' className='checkbox '
                        checked={selectedGender === 'male'}
                        onChange={() => handleGenderChange('male')}
                    />
                </label>
            </div>

            <div className='form-control'>
                <label className={'label gap-2 cursor-pointer'}>
                    <span className='label-text'>Female</span>
                    <input type='checkbox' className='checkbox'
                        checked={selectedGender === 'female'}
                        onChange={() => handleGenderChange('female')}
                    />
                </label>
            </div>

        </div>
    </>
  )
}

export default GenderCheckBox
