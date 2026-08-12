'use client';

export default function NavBar() {
  return (
    <>
<div className="jbar">
    <a className="brand" href="#top">
      <img className="brand__logo" src="/images/mainlogo.png" alt="ByteBoom" width="316" height="96" decoding="async" />
    </a>
    <nav className="jnav" aria-label="Sections">
      <a href="#productnode">Engines</a>
      <a href="#journeynode">Journey</a>
      <a href="#pricingnode">Pricing</a>
      <a href="#securitynode">Security</a>
      <a href="#edgenode">Metrics</a>
      <a href="#aboutnode">About</a>
      <a href="#faqnode">FAQ</a>
    </nav>
    <a className="btn btn--primary" href="#pricingnode" data-magnetic>Get Started</a>
  </div>
    </>
  );
}
