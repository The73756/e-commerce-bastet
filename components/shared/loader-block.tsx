export const LoaderBlock = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-blue'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 200 200'
        className='size-20 text-white'
      >
        <radialGradient
          id='a11'
          cx='.66'
          fx='.66'
          cy='.3125'
          fy='.3125'
          gradientTransform='scale(1.5)'
        >
          <stop offset='0' stopColor='currentColor' />
          <stop offset='.3' stopColor='currentColor' stopOpacity='.9' />
          <stop offset='.6' stopColor='currentColor' stopOpacity='.6' />
          <stop offset='.8' stopColor='currentColor' stopOpacity='.3' />
          <stop offset='1' stopColor='currentColor' stopOpacity='0' />
        </radialGradient>
        <circle
          transformOrigin='center'
          fill='none'
          stroke='url(#a11)'
          strokeWidth='15'
          strokeLinecap='round'
          strokeDasharray='200 1000'
          strokeDashoffset='0'
          cx='100'
          cy='100'
          r='70'
        >
          <animateTransform
            type='rotate'
            attributeName='transform'
            calcMode='spline'
            dur='2'
            values='360;0'
            keyTimes='0;1'
            keySplines='0 0 1 1'
            repeatCount='indefinite'
          />
        </circle>
        <circle
          transformOrigin='center'
          fill='none'
          opacity='.2'
          stroke='currentColor'
          strokeWidth='15'
          strokeLinecap='round'
          cx='100'
          cy='100'
          r='70'
        />
      </svg>
    </div>
  );
};
