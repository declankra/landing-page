// 4. Social Links Component (emails/components/social-links.tsx)
import { Link, Row } from '@react-email/components'
import * as React from 'react'

interface SocialLinksProps {
  links: {
    linkedin?: string
    github?: string
    producthunt?: string
    twitter?: string
  }
}

export const SocialLinks = ({ links }: SocialLinksProps) => {
  return (
    <Row style={socialLinksContainer}>
      {links.linkedin && (
        <Link href={links.linkedin} style={socialLink}>
          LinkedIn
        </Link>
      )}
      {links.github && (
        <Link href={links.github} style={socialLink}>
          GitHub
        </Link>
      )}
      {links.producthunt && (
        <Link href={links.producthunt} style={socialLink}>
          ProductHunt
        </Link>
      )}
      {links.twitter && (
        <Link href={links.twitter} style={socialLink}>
          Twitter
        </Link>
      )}
    </Row>
  )
}

const socialLinksContainer = {
  marginTop: '12px',
  marginBottom: '12px',
}

const socialLink = {
  color: '#8898aa',
  fontSize: '12px',
  textDecoration: 'none',
  marginRight: '12px',
}