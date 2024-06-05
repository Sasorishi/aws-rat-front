import React from "react";
import Image from "next/image";

export default function FooterLayout() {
  return (
    <footer class="p-4 bg-white shadow md:px-6 md:py-8 dark:bg-gray-800">
      <div class="sm:flex sm:items-center sm:justify-between">
        <a href="#" target="_blank" class="flex items-center mb-4 sm:mb-0">
          <Image
            className="m-auto relative invert mr-4"
            src="/aws.png"
            alt="Logo"
            width={76}
            height={37}
            priority
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Prospero
          </span>
        </a>
        <ul class="flex flex-wrap items-center mb-6 sm:mb-0">
          <li>
            <a
              href="#"
              class="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              class="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              class="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400"
            >
              Licensing
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-sm text-gray-500 hover:underline dark:text-gray-400"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a href="https://flowbite.com" target="_blank" class="hover:underline">
          AWS PROSPERO™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
