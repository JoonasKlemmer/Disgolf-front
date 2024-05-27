import Image from 'next/image'

export default function Home() {
	return (
		<>
			<div className='pages-container'>
				<p><a href="/routes/search">Leia</a> omale parim ketas</p>
				<p>Hetkel võimalik leida kettaid järgnevatelt lehtedelt:</p>
				<p>
					<a href="https://discgolfar.ee/et/" target='_blank'>
						<Image
							src={"https://discgolfar.ee/img/discgolfaree-logo-1612476986.jpg"}
							width={200}
							height={100}
							alt={"discgolfar.ee"}
						/>
					</a>
				</p>
				<p>
					<a href="https://discgolf.ee/" target='_blank'>
						<Image
							src={"https://discgolf.ee/cdn/shop/files/Discgolf_ee_2_1_300x.png?v=1614321018"}
							width={200}
							height={100}
							alt={"discgolf.ee"}
						/>
					</a>
				</p>
				<p>
					<a href="https://www.discsport.ee/et" target='_blank'>
						<Image
							src={"https://www.discsport.ee/images/discsport-logo.png"}
							width={200}
							height={100}
							alt={"discsport.ee"}
						/>
					</a>
				</p>
				<p>
					<a href="https://discy.ee/" target='_blank'>
						<Image
							src={"https://discy.ee/wp-content/uploads/2022/05/discy_logo.png"}
							width={200}
							height={100}
							alt={"discy.ee"}
						/>
					</a>
				</p>
				<p>
					<a href="https://thuledg.ee/" target='_blank'>
						<Image
							src={"http://thuledg.ee/wp-content/uploads/2020/07/wide-web.png"}
							width={200}
							height={100}
							alt={"discy.ee"}
						/>
					</a>
				</p>
			</div>
		</>
	);
}
