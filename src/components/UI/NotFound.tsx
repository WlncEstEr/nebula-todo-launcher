import { Link } from 'react-router'
import { buildPath } from '../../config/routing.config'

export function NotFound() {
  return (
    <div className="w-full h-full items-center flex justify-center text-5xl text-text cursor-pointer">
      <Link to={buildPath('HOME')}>404 Page - NotFound</Link>
    </div>
  )
}
