import {useState} from 'react'
import {HiChevronDown, HiOutlineEnvelope} from 'react-icons/hi2'
import {Switch} from '@headlessui/react'
import classNames from "classnames";

export default function Contact() {
  const [agreed, setAgreed] = useState(false)

  return (
      <div className="isolate py-12 px-6 sm:py-16 lg:px-8">
        <div
            className="absolute inset-x-0 top-[5rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[0.5rem]">
          <svg
              className="relative left-1/2 -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-40rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
          >
            <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                  id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC"/>
                <stop offset={1} stopColor="#FF80B5"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="w-full flex mb-20 sm:mb-16 text-center items-center justify-center">
          <div className="relative z-10 mx-auto pl-4 pr-8 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-5xl">
              Get in touch
            </h1>
            <p className="mt-6 text-xl text-gray-500 max-w-xl">
              Vel nunc non ut montes, viverra tempor. Proin lectus nibh phasellus morbi non morbi. In
              elementum urna
              ut volutpat. Sagittis et vel et fermentum amet consequat.
            </p>
          </div>
        </div>
        <div className="grid gap-12 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative overflow-hidden px-6 space-y-8 sm:px-10">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl">Contact
                info</h2>
              <p className="mt-6 text-md leading-8 text-gray-600 dark:text-gray-400">
                Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet.
                Sapien tortor lacus arcu.
              </p>
            </div>
            <div className="flex text-base text-gray-800 dark:text-gray-200">
              <HiOutlineEnvelope
                  className="flex-shrink-0 w-6 h-6 text-gray-600 hover:text-gray-900 dark:text-indigo-200 dark:hover:text-indigo-50"
                  aria-hidden="true"/>
              <span className="ml-3">support@workcation.com</span>
            </div>
            <div className="flex space-x-6">
              <a href="#"
                 className="text-gray-600 hover:text-gray-900 dark:text-indigo-200 dark:hover:text-indigo-50">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#"
                 className="text-gray-600 hover:text-gray-900 dark:text-indigo-200 dark:hover:text-indigo-50">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#"
                 className="text-gray-600 hover:text-gray-900 dark:text-indigo-200 dark:hover:text-indigo-50">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                      d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#"
                 className="text-gray-600 hover:text-gray-900 dark:text-indigo-200 dark:hover:text-indigo-50">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <form action="#" method="POST" className="mx-auto max-w-xl">
              <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name"
                         className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200">
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        placeholder="Jane"
                        className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 placeholder:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="last-name"
                         className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200">
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        placeholder="Doe"
                        className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 placeholder:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email"
                         className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200">
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 placeholder:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label htmlFor="phone-number"
                           className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200">
                      Phone number
                    </label>
                    <span id="phone-optional" className="text-sm text-gray-400">Optional</span>
                  </div>
                  <div className="relative mt-2.5">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <label htmlFor="country" className="sr-only">
                        Country
                      </label>
                      <select
                          id="country"
                          name="country"
                          className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-0"
                      >
                        <option>US</option>
                        <option>CA</option>
                        <option>EU</option>
                      </select>
                      <HiChevronDown
                          className="pointer-events-none absolute top-0 right-3 h-full w-5 text-gray-400"
                          aria-hidden="true"
                      />
                    </div>
                    <input
                        type="tel"
                        name="phone-number"
                        id="phone-number"
                        autoComplete="tel"
                        placeholder="+1 (555) 987-6543"
                        className="block w-full rounded-md border-0 py-2 px-3.5 pl-16 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 placeholder:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between">
                    <label htmlFor="message"
                           className="block text-sm font-semibold leading-6 text-gray-800 dark:text-gray-200">
                      Message
                    </label>
                    <span id="message-max" className="text-sm text-gray-400">Max. 500 characters</span>
                  </div>
                  <div className="mt-2.5">
              <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="What can we help you with?"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 placeholder:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  defaultValue={''}
              />
                  </div>
                </div>
                <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                  <div className="flex h-6 items-center">
                    <Switch
                        checked={agreed}
                        onChange={setAgreed}
                        className={classNames(
                            agreed ? 'bg-indigo-600' : 'bg-gray-300',
                            'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        )}
                    >
                      <span className="sr-only">Agree to policies</span>
                      <span
                          aria-hidden="true"
                          className={classNames(
                              agreed ? 'translate-x-3.5' : 'translate-x-0',
                              'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                          )}
                      />
                    </Switch>
                  </div>
                  <Switch.Label className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                    By selecting this, you agree to our{' '}
                    <a href="#" className="font-semibold text-indigo-600 dark:text-gray-400">
                      privacy&nbsp;policy
                    </a>
                    .
                  </Switch.Label>
                </Switch.Group>
              </div>
              <div className="mt-10">
                <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Let&apos;s talk
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}
