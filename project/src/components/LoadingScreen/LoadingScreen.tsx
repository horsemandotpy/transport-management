import { LoadingButton, LoadingButtonWrapper, LoadingScreenWrapper } from './loadingScreenStyle'

const LoadingScreen = ({ message }) => {
    return (

        <LoadingScreenWrapper>
            <LoadingButtonWrapper>
                <LoadingButton type='primary' loading>
                    {message}
                </LoadingButton>
            </LoadingButtonWrapper>
        </LoadingScreenWrapper>
    )

}

export default LoadingScreen;
