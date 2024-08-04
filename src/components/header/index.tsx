import { FeedbackFormButton } from "./feedbackForm";
import { GithubLink } from "./githubLink";
import { Logo } from "../logo";
import { ProfileDetails } from "./profileDetails";
import Link from "next/link";

export function MainHeader() {
  return <header
    className="flex justify-between items-center p-4 sticky top-0 z-50 supports-[backdrop-filter]:bg-neutral-50/60 bg-neutral-50/95 backdrop-blur">
    <Link
      href={"/"}>
      <Logo />
    </Link>
    <nav>
      <ul
        className="flex gap-3">
        <li>
          <FeedbackFormButton />
        </li>
        <li>
          <GithubLink />
        </li>
        <li>
          <ProfileDetails />
        </li>
      </ul>
    </nav>
  </header>;
}
