"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              Computational Complexity
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              An interactive learning platform for computational theory, complexity classes, and algorithmic problem-solving.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/exercises/complexity-theory" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Complexity Theory
                </Link>
              </li>
              <li>
                <Link href="/exercises/turing-machines" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  Turing Machines
                </Link>
              </li>
              <li>
                <Link href="/exercises/np-completeness" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                  NP-Completeness
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Resources</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Inspired by <span className="font-medium text-foreground">Peter Linz</span>, Section 14:
              <br />
              <span className="italic">"An Overview Of Computational Complexity"</span>
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors group"
            >
              <Icon icon="mdi:github" className="text-lg group-hover:scale-110 transition-transform" />
              View Source on GitHub
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Computational Complexity. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                Made with <Icon icon="mdi:heart" className="text-red-500 animate-pulse" /> for learning
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
