import * as React from 'react'  



export default function Upload(){

    const handleFileSelected = () => {
        
    }

    const uploadHandler = () => {

    }


    return(
        <>
        <div>
            THis is upload page
        </div>
        <div>
            <h1>Upload your image here</h1>
            <form>
                <input type="file" name="image" id="image" onChange={}/>
                <button onClick={uploadHandler}
                class="bg-gray-800 w-1/5 text-white">
                    Upload
                </button>
            </form>
            
        </div>

        </>

    )
}